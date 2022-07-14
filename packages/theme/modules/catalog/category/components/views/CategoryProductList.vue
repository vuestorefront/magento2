<template>
  <transition-group
    appear
    class="list-layout"
    name="slide"
    tag="div"
  >
    <template v-if="loading">
      <div
        v-for="n in 4*3"
        :key="n"
        class="sf-product-card-horizontal card skeleton-container"
        data-testid="skeleton"
      >
        <SkeletonLoader
          :height="`${imageSize.height}px`"
        />
      </div>
    </template>
    <template v-else>
      <SfProductCardHorizontal
        v-for="product in productsFormatted"
        :key="product.uid"
        v-bind="product.commonProps"
        class="card"
        data-testid="product-card"
        :image-height="imageSize.height"
        :image-width="imageSize.width"
        :wishlist-icon="false"
        @click:wishlist="$emit('click:wishlist', product)"
        @click:add-to-cart="$emit('click:add-to-cart', { product, quantity: $event })"
      >
        <template #configuration>
          <SfProperty
            class="desktop-only card__property-size"
            name="Size"
            value="XS"
          />
          <SfProperty
            class="desktop-only"
            name="Color"
            value="white"
          />
        </template>
        <template #price>
          <CategoryProductPrice :product="product" />
        </template>
        <template #actions>
          <SfButton
            v-if="isAuthenticated"
            class="sf-button--text card__add-to-wishlist"
            data-testid="wishlist-button"
            @click="$emit('click:wishlist', product)"
          >
            {{ product.wishlistMessage }}
          </SfButton>
        </template>
      </SfProductCardHorizontal>
    </template>
  </transition-group>
</template>

<script lang="ts">
import {
  defineComponent, computed, useContext, PropType, toRefs,
} from '@nuxtjs/composition-api';
import {
  SfProductCardHorizontal, SfButton, SfProperty,
} from '@storefront-ui/vue';
import SkeletonLoader from '~/components/SkeletonLoader/index.vue';

import { useImage } from '~/composables';
import type { Product } from '~/modules/catalog/product/types';
import { useUser } from '~/modules/customer/composables/useUser';
import { useProductsWithCommonProductCardProps } from './useProductsWithCommonCardProps';
import CategoryProductPrice from '~/modules/catalog/category/components/views/CategoryProductPrice.vue';

export default defineComponent({
  components: {
    CategoryProductPrice,
    SfProductCardHorizontal,
    SfButton,
    SfProperty,
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
    const context = useContext();

    const { products } = toRefs(props);
    const { productsWithCommonProductCardProps } = useProductsWithCommonProductCardProps(products);

    const productsFormatted = computed(() => productsWithCommonProductCardProps.value.map((product) => {
      const label = product.commonProps.isInWishlist
        ? 'Remove from Wishlist'
        : 'Save for later';

      return {
        ...product,
        wishlistMessage: context.i18n.t(label),
      };
    }));

    const { imageSizes: { productCardHorizontal: imageSize } } = useImage();

    const { isAuthenticated } = useUser();

    return {
      productsFormatted,
      imageSize,
      isAuthenticated,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./transition.scss";

.list-layout {
  will-change: transform;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  @include for-desktop {
    margin: 0 0 0 var(--spacer-sm);
  }
}

.skeleton-container > * {
  width: 100%;
}

.card {
  flex: 0 0 100%;

  @include for-desktop {
    margin: var(--spacer-lg) 0;
  }

  @include for-mobile {
    ::v-deep .sf-image {
      --image-width: 5.3125rem;
      --image-height: 7.0625rem;
    }
  }

  &__property-size {
    margin-bottom: 1rem;
  }

  &__add-to-wishlist {
    @include for-mobile {
      margin: 1rem auto;
    }

    display: block;
  }
}

::v-deep .sf-product-card-horizontal {
  &__main {
    @include  for-mobile {
      align-items: flex-end;
    }
  }

  &__add-to-cart {
    @include for-mobile {
      opacity: 1;
      display: flex !important;
      bottom: 1rem;
      right: 0;
      margin-top: var(--spacer-xs);
    }
  }

  .sf-add-to-cart__select-quantity {
    display: none;
  }

  .sf-image {
    width: auto;
    height: auto;
  }
}

::v-deep .sf-product-card::after {
  content: none;
}

</style>
