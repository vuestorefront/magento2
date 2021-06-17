<template>
  <SfSection
    :title-heading="title"
    class="section"
  >
    <SfLoader
      :class="{ loading }"
      :loading="loading"
    >
      <SfCarousel
        data-cy="related-products-carousel"
        :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
        class="carousel"
      >
        <SfCarouselItem
          v-for="(product, i) in mappedProducts"
          :key="i"
          class="carousel__item"
        >
          <SfProductCard
            :title="productGetters.getName(product)"
            :image="productGetters.getProductThumbnailImage(product)"
            :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
            :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
            :link="localePath(`/p/${productGetters.getProductSku(product)}${productGetters.getSlug(product, product.categories[0])}`)"
            :max-rating="5"
            :score-rating="productGetters.getAverageRating(product)"
            :reviews-count="productGetters.getTotalReviews(product)"
            :wishlist-icon="isAuthenticated ? 'heart' : false"
            :is-on-wishlist="product.isInWishlist"
            @click:wishlist="addItemToWishlist(product)"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script lang="ts">
import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader,
} from '@storefront-ui/vue';

import { productGetters, useUser, useWishlist } from '@vue-storefront/magento';
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProductsCarousel',
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    products: {
      type: Array,
      required: false,
      default: () => ([]),
    },
    loading: Boolean,
  },
  setup(props) {
    const { isAuthenticated } = useUser();
    const { isInWishlist, addItem, removeItem } = useWishlist();

    const mappedProducts = computed(() => props.products.map((product) => ({
      // @ts-ignore
      ...product,
      isInWishlist: isInWishlist({ product }),
    })));

    const addItemToWishlist = async (product) => {
      await (
        isInWishlist({ product })
          ? removeItem({ product })
          : addItem({ product })
      );
    };

    return {
      mappedProducts,
      addItemToWishlist,
      productGetters,
      isInWishlist,
      isAuthenticated,
    };
  },
});
</script>

<style lang="scss" scoped>
.section {
  margin-top: var(--spacer-base);
}

.carousel {
  margin: 0 calc(var(--spacer-sm) * -1) 0 0;
  @include for-desktop {
    margin: 0;
  }

  &__item {
    margin: 1.9375rem 0 2.4375rem 0;
  }
}

</style>
