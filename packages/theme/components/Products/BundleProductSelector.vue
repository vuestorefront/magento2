<template>
  <div
    v-if="!productLoading"
  >
    <SfList class="bundle_products">
      <SfListItem
        v-for="(bundle) in bundleProduct"
        :key="`${bundle.uid}`"
        class="bundle_products--item"
      >
        <p
          :class="{'bundle_products--item-required': bundle.required }"
        >
          {{ bundle.title }}
        </p>
        <SfList
          class="bundle_products--options"
        >
          <SfListItem
            v-for="(option) in bundle.options"
            :key="`${option.uid}`"
            class="bundle_products--options-option"
          >
            <template
              v-if="bundle.options.length === 1"
            >
              {{ productGetters.getName(option.product) }}
              <SfPrice
                :regular="$n(productGetters.getPrice(option.product).regular, 'currency')"
                :special="productGetters.getPrice(option.product).special && $n(productGetters.getPrice(option.product).special, 'currency')"
              />
            </template>
            <template
              v-else
            >
              <SfRadio
                v-if="selectedOptions[bundle.uid]"
                v-model="selectedOptions[bundle.uid].uid"
                :name="bundle.uid"
                :value="option.uid"
                :label="productGetters.getName(option.product)"
                @change="selectedOptions[bundle.uid].price = productGetters.getPrice(option.product).regular"
              >
                <template #description>
                  <SfPrice
                    :regular="$n(productGetters.getPrice(option.product).regular, 'currency')"
                    :special="productGetters.getPrice(option.product).special && $n(productGetters.getPrice(option.product).special, 'currency')"
                  />
                </template>
              </SfRadio>
            </template>
          </SfListItem>
        </SfList>
        <p>
          Quantity
        </p>
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
      Add to Cart
    </SfButton>
  </div>
</template>
<script>
import {
  SfList,
  SfPrice,
  SfQuantitySelector,
  SfRadio,
  SfButton,
} from '@storefront-ui/vue';
import { productGetters, useCart } from '@vue-storefront/magento';
import {
  computed,
  defineComponent,
  ref,
  watch,
} from '@nuxtjs/composition-api';
import { bundleProductInitialSelector } from '~/helpers/product/bundleProduct';
import { productData } from '~/helpers/product/productData';

export default defineComponent({
  name: 'BundleProductSelector',
  components: {
    SfButton,
    SfList,
    SfPrice,
    SfQuantitySelector,
    SfRadio,
  },
  props: {
    canAddToCart: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['update-bundle', 'update-price'],
  setup(props, { emit }) {
    const { product, loading: productLoading } = productData();
    const { loading, addItem } = useCart();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const bundleProduct = computed(() => productGetters.getBundleProducts(product.value));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const selectedOptions = ref(() => []);
    selectedOptions.value = bundleProductInitialSelector(bundleProduct.value);

    const canChangeQuantity = (bundle) => {
      const selectedOption = bundle.options.find((o) => o.uid === selectedOptions.value[bundle.uid]?.uid);

      return !selectedOption.can_change_quantity;
    };

    const price = computed(() => Object.keys(selectedOptions.value)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .reduce((s, k) => s + (Number.parseFloat(selectedOptions.value[k].price) * selectedOptions.value[k].quantity), 0));

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
          ...product.value,
          bundle_options: bundleProductData.value,
        },
        quantity: 1,
      });
    };

    watch(bundleProduct, (newVal) => {
      selectedOptions.value = newVal;
    }, { deep: true });

    watch(computed(() => selectedOptions.value), () => {
      emit('update-bundle', selectedOptions.value);
      emit('update-price', price.value);
    }, { deep: true });

    return {
      addToCart,
      bundleProduct,
      canChangeQuantity,
      loading,
      productLoading,
      price,
      product,
      productGetters,
      selectedOptions,
    };
  },
});
</script>
<style lang="scss">
.bundle_products {
  &--add-to-cart{
    width: 100%;
  }

  &--item {
      padding: 0 0 var(--spacer-base) 0 !important;
      border-bottom: 1px solid #e4e4e4 !important;

      p {
        font-weight: 600;
      }
      &-required{
        &:after{
          content: '*';
          color: #e02b27;
          font-size: 1.2rem;
          margin: 0 0 0 5px;
        }
      }
    }

  &--options{
    &-option{
      .sf-price{
        &:before{
          content: '+';
          margin-right: 5px;
          font: var(--price-regular-font,
                var(--price-regular-font-weight,
                var(--font-weight--medium)) var(--price-regular-font-size,
                var(--font-size--lg))/var(--price-regular-font-line-height, 1.6) var(--price-regular-font-family,
                var(--font-family--secondary)));
          color: var(--price-regular-color, var(--c-text));
        }
      }
    }
  }
}
</style>
