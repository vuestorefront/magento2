<template>
  <transition-group
    appear
    class="grid-layout"
    name="slide"
    tag="div"
  >
    <template v-if="loading">
      <div
        v-for="n in 4*3"
        :key="n"
        class="sf-product-card card"
        data-testid="skeleton"
      >
        <SkeletonLoader :height="`${imageSize.height}px`" />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    </template>
    <template v-else>
      <SfProductCard
        v-for="product in productsWithCommonProductCardProps"
        :key="product.uid"
        v-bind="product.commonProps"
        class="card"
        data-testid="product-card"
        :image-height="imageSize.height"
        :image-width="imageSize.width"
        :show-add-to-cart-button="true"
        @click:wishlist="$emit('click:wishlist', product)"
        @click:add-to-cart="$emit('click:add-to-cart', { product, quantity: 1 })"
      >
        <template #price>
          <CategoryProductPrice :product="product" />
        </template>
      </SfProductCard>
    </template>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from '@nuxtjs/composition-api';
import { SfProductCard } from '@storefront-ui/vue';
import { useImage } from '~/composables';
import type { Product } from '~/modules/catalog/product/types';

import SkeletonLoader from '~/components/SkeletonLoader/index.vue';
import { useProductsWithCommonProductCardProps } from './useProductsWithCommonCardProps';
import CategoryProductPrice from '~/modules/catalog/category/components/views/CategoryProductPrice.vue';

export default defineComponent({
  components: {
    CategoryProductPrice,
    SfProductCard,
    SkeletonLoader,
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
    pricesLoaded: Boolean,
    loading: Boolean,
  },
  emits: ['click:wishlist', 'click:add-to-cart'],
  setup(props) {
    const { imageSizes: { productCard: imageSize } } = useImage();
    const { products } = toRefs(props);
    const { productsWithCommonProductCardProps } = useProductsWithCommonProductCardProps(products);

    return {
      imageSize,
      productsWithCommonProductCardProps,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./transition.scss";
.grid-layout {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  @include for-desktop {
    justify-content: flex-start;
    margin: var(--spacer-sm) 0 0 var(--spacer-sm);
  }
}
.card {
  --product-card-title-font-weight: var(--font-weight--medium);
  --product-card-title-margin: var(--spacer-xs) 0 0 0;
  flex: 1 1 100%;

  @include for-desktop {
    --product-card-max-width: 25%;
    --product-card-title-font-weight: var(--font-weight--normal);
    --product-card-title-margin: var(--spacer-sm) 0 0 0;
    --product-card-add-button-bottom: var(--spacer-base);
  }
}

::v-deep .sf-product-card {
  .card {
    will-change: transform, opacity;
  }

  &__image-wrapper {
    height: 257px;
  }

  &__add-button {
    @include for-mobile {
      opacity: 1;
      display: flex;
      bottom: 1rem;
      right: 0;
    }
  }
}

::v-deep .sf-product-card::after {
  content: none;
}

</style>
