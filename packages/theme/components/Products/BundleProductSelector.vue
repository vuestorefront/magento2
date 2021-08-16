<template>
  <div
    v-if="isMounted"
  >
    <SfList class="bundle_products">
      <SfListItem
        v-for="(bundle, index) in bundleProduct"
        :key="index"
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
            v-for="(option, i) in bundle.options"
            :key="i"
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
          v-model="selectedOptions[bundle.uid].quantity"
          :disabled="canChangeQuantity(bundle)"
        />
      </SfListItem>
    </SfList>
    <button
      v-e2e="'product_add-to-cart'"
      :disabled="loading"
      class="color-primary sf-button bundle_products--add-to-cart"
    >
      Add to Cart
    </button>
  </div>
</template>
<script>
import {
  SfList,
  SfPrice,
  SfQuantitySelector,
  SfRadio,
} from '@storefront-ui/vue';
import { productGetters, useCart } from '@vue-storefront/magento';
import { ref, watch, computed } from '@vue/composition-api';
import { bundleProductInitialSelector } from '~/helpers/product/bundleProduct';
import { productData } from '~/helpers/product/productData';

export default {
  name: 'BundleProductSelector',
  components: {
    SfList,
    SfPrice,
    SfQuantitySelector,
    SfRadio,
  },
  emits: ['update-bundle', 'update-price'],
  setup(props, { emit }) {
    const { product } = productData();
    const { loading } = useCart();
    const selectedOptions = computed(() => bundleProductInitialSelector(productGetters.getBundleProducts(product.value)));

    const bundleProduct = computed(() => productGetters.getBundleProducts(product.value));
    const isMounted = computed(() => Object.keys(selectedOptions).length > 0);
    /*   const canAddToCart = computed(() => {
      const inStock = product.value.stock_status || '';
      const stockLeft = product.value.only_x_left_in_stock === null ? true : qty.value <= product.value.only_x_left_in_stock;
      return inStock && stockLeft;
    }); */

    const canChangeQuantity = (bundle) => {
      const selectedOption = bundle.options.find((o) => o.uid === selectedOptions.value[bundle.uid].uid);

      return !selectedOption.can_change_quantity;
    };

    const price = computed(() => Object.keys(selectedOptions.value)
      .reduce((s, k) => s + (Number.parseFloat(selectedOptions.value[k].price) * selectedOptions.value[k].quantity), 0));

    watch(computed(() => selectedOptions.value), () => {
      emit('update-bundle', selectedOptions.value);
      emit('update-price', price.value);
    }, { deep: true });

    return {
      bundleProduct,
      canChangeQuantity,
      isMounted,
      loading,
      price,
      productGetters,
      selectedOptions,
    };
  },
};
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
          font: var(--price-regular-font, var(--price-regular-font-weight, var(--font-weight--medium)) var(--price-regular-font-size, var(--font-size--lg))/var(--price-regular-font-line-height, 1.6) var(--price-regular-font-family, var(--font-family--secondary)));
          color: var(--price-regular-color, var(--c-text));
        }
      }
    }
  }
}
</style>
