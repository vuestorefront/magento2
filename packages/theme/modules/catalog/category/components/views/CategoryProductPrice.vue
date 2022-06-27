<template>
  <div
    v-if="product.__typename === 'GroupedProduct'"
    class="product-price"
  >
    <div class="product-price__row">
      <span
        class="product-price__label"
      >{{ $t('Starting at') }}:</span>
      <SfPrice
        class="sf-product-card__price"
        :regular="product.commonProps.regularPrice"
        :special="product.commonProps.specialPrice"
      />
    </div>
  </div>
  <div
    v-else-if="product.__typename === 'BundleProduct'"
    class="product-price"
  >
    <div class="product-price__row">
      <span
        class="product-price__label"
      >{{ $t('From') }}:</span>
      <SfPrice
        class="sf-product-card__price"
        :regular="product.commonProps.regularPrice"
        :special="product.commonProps.specialPrice"
      />
    </div>
    <div class="product-price__row">
      <span
        class="product-price__label"
      >{{ $t('To') }}:</span>
      <SfPrice
        class="sf-product-card__price"
        :regular="product.commonProps.maximumPrice"
      />
    </div>
  </div>
  <div
    v-else
    class="product-price"
  >
    <SfPrice
      class="sf-product-card__price"
      :regular="product.commonProps.regularPrice"
      :special="product.commonProps.specialPrice"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { SfPrice } from '@storefront-ui/vue';
import type { ProductWithCommonProductCardProps } from '~/modules/catalog/category/components/views/useProductsWithCommonCardProps';

export default defineComponent({
  name: 'CategoryProductPrice',
  components: {
    SfPrice,
  },
  props: {
    product: {
      type: Object as PropType<ProductWithCommonProductCardProps>,
      required: true,
    },
  },
});

</script>
<style lang="scss">
.product-price {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  &__label {
    font-size: var(--font-size--sm);
    font-weight: 100;
    margin-right: var(--spacer-xs);
  }

  &__row {
    display: flex;
    align-items: center;
  }

  .sf-product-card__price {
    margin: 0;
  }
}
</style>
