<template>
  <div>
    <SfList class="bundle_products">
      <SfListItem
        v-for="bundle in bundleProduct"
        :key="`${bundle.uid}`"
        class="bundle_products--item"
      >
        <p :class="{ 'bundle_products--item-required': bundle.required }">
          {{ bundle.title }}
        </p>
        <SfList class="bundle_products--options">
          <SfListItem
            v-for="option in bundle.options"
            :key="`${option.uid}`"
            class="bundle_products--options-option"
          >
            <template v-if="bundle.options.length === 1">
              <div class="bundle_products--options-option__container">
                <p>{{ getProductName(option.product) }}</p>
                <SfPrice
                  :regular="
                    $fc(getProductPrice(option.product).regular)
                  "
                  :special="
                    getProductPrice(option.product).special &&
                      $fc(getProductPrice(option.product).special)
                  "
                />
              </div>
            </template>
            <template v-else>
              <SfRadio
                v-if="selectedOptions[bundle.uid]"
                v-model="selectedOptions[bundle.uid].uid"
                :name="bundle.uid"
                :value="option.uid"
                :label="getProductName(option.product)"
                @change="
                  selectedOptions[bundle.uid].price = getProductPrice(
                    option.product
                  ).final
                "
              >
                <template #description>
                  <SfPrice
                    :regular="
                      $fc(getProductPrice(option.product).regular)
                    "
                    :special="
                      getProductPrice(option.product).special &&
                        $fc(getProductPrice(option.product).special)
                    "
                  />
                </template>
              </SfRadio>
            </template>
          </SfListItem>
        </SfList>
        <p>{{ $t('Quantity') }}</p>
        <SfQuantitySelector
          v-if="selectedOptions[bundle.uid]"
          v-model="selectedOptions[bundle.uid].quantity"
          :disabled="!canChangeQuantity || !canAddToCart"
        />
      </SfListItem>
    </SfList>
    <SfButton
      v-e2e="'product_add-to-cart'"
      :disabled="loading || !canAddToCart"
      class="color-primary bundle_products--add-to-cart"
      @click="addToCart"
    >
      {{ $t('Add to cart') }}
    </SfButton>
    <SfAlert
      :style="{ visibility: !!addToCartError ? 'visible' : 'hidden'}"
      class="product__add-to-cart-error"
      :message="$t(addToCartError)"
      type="danger"
    />
  </div>
</template>
<script lang="ts">
import {
  SfList,
  SfPrice,
  SfQuantitySelector,
  SfRadio,
  SfButton,
  SfAlert,
} from '@storefront-ui/vue';
import {
  computed, defineComponent, PropType, ref, watch,
} from '@nuxtjs/composition-api';
import {
  getBundleProducts,
  getName as getProductName,
  getPrice as getProductPrice,
} from '~/modules/catalog/product/getters/productGetters';
import { bundleProductInitialSelector } from '~/modules/catalog/product/helpers/bundleProduct';
import type { WithTypename } from '~/modules/catalog/product/types';
import type { BundleProduct } from '~/modules/GraphQL/types';

import useCart from '~/modules/checkout/composables/useCart';

export default defineComponent({
  name: 'BundleProductSelector',
  components: {
    SfButton,
    SfList,
    SfPrice,
    SfQuantitySelector,
    SfRadio,
    SfAlert,
  },
  props: {
    canAddToCart: {
      type: Boolean,
      required: false,
      default: true,
    },
    product: {
      type: Object as PropType<WithTypename<BundleProduct>>,
      required: true,
    },
  },
  emits: ['update-bundle', 'update-price'],
  setup(props, { emit }) {
    const { loading, addItem, error: cartError } = useCart();
    const bundleProduct = computed(() => getBundleProducts(props.product));
    const selectedOptions = ref({});
    const addToCartError = computed(() => cartError.value?.addItem?.message);

    selectedOptions.value = bundleProductInitialSelector(bundleProduct.value);

    const canChangeQuantity = (bundle) => {
      const selectedOption = bundle.options.find(
        (o) => o.uid === selectedOptions.value[bundle.uid]?.uid,
      );

      return !selectedOption.can_change_quantity;
    };

    const price = computed(() => Object.keys(selectedOptions.value)
      .reduce(
        (s, k) => s
            + Number.parseFloat(selectedOptions?.value[k]?.price as string)
              * selectedOptions.value[k].quantity,
        0,
      ));

    const addToCart = async () => {
      const bundleProductData = computed(() => Object.keys(selectedOptions.value).map((selectedOptionKey) => {
        const selectedOption = selectedOptions.value[selectedOptionKey];
        return {
          uid: selectedOption.uid,
          value: selectedOption.quantity,
        };
      }));

      await addItem({
        product: {
          ...props.product,
          bundle_options: bundleProductData.value,
        } as BundleProduct,
        quantity: 1,
      });
    };

    watch(
      bundleProduct,
      (newVal) => {
        selectedOptions.value = newVal;
      },
      { deep: true },
    );

    watch(
      computed(() => selectedOptions.value),
      () => {
        emit('update-bundle', selectedOptions.value);
        emit('update-price', price.value);
      },
      { deep: true },
    );

    return {
      addToCart,
      bundleProduct,
      canChangeQuantity,
      loading,
      price,
      getProductName,
      getProductPrice,
      selectedOptions,
      addToCartError,
    };
  },
});
</script>
<style lang="scss">
.bundle_products {
  &--add-to-cart {
    width: 100%;
  }

  &--item {
    padding: 0 0 var(--spacer-base) 0 !important;
    border-bottom: 1px solid #e4e4e4 !important;
    .sf-quantity-selector {
      margin: 0 var(--spacer-sm) !important;
    }
    p {
      font-weight: 600;
      padding: 0 var(--spacer-sm);
    }
    &-required {
      &:after {
        content: '*';
        color: #e02b27;
        font-size: 1.2rem;
        margin: 0 0 0 5px;
      }
    }
  }

  &--options {
    &-option {
      &__container {
        p,
        .sf-price {
          padding: 0 var(--spacer-sm) !important;
        }
      }
      .sf-price {
        &:before {
          content: '+';
          margin-right: 5px;
          font: var(
            --price-regular-font,
            var(--price-regular-font-weight, var(--font-weight--medium))
              var(--price-regular-font-size, var(--font-size--lg)) /
              var(--price-regular-font-line-height, 1.6)
              var(--price-regular-font-family, var(--font-family--secondary))
          );
          color: var(--price-regular-color, var(--c-text));
        }
      }
    }
  }
}
</style>
