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
            :image-width="imageSizes.productCard.width"
            :image-height="imageSizes.productCard.height"
            :image="getMagentoImage(productGetters.getProductThumbnailImage(product))"
            :regular-price="$fc(productGetters.getPrice(product).regular)"
            :special-price="productGetters.getPrice(product).special && $fc(productGetters.getPrice(product).special)"
            :link="localePath(`/p/${productGetters.getProductSku(product)}${productGetters.getSlug(product, product.categories[0])}`)"
            :max-rating="5"
            :score-rating="productGetters.getAverageRating(product)"
            :reviews-count="productGetters.getTotalReviews(product)"
            :is-in-wishlist="isInWishlist({ product })"
            :is-added-to-cart="isInCart({ product })"
            :wishlist-icon="isAuthenticated ? 'heart' : ''"
            :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
            @click:wishlist="addItemToWishlist(product)"
            @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
          >
            <template #image="imageSlotProps">
              <SfButton
                :link="imageSlotProps.link"
                class="sf-button--pure sf-product-card__link"
                data-testid="product-link"
                aria-label="Go To Product"
                v-on="$listeners"
              >
                <template v-if="Array.isArray(imageSlotProps.image)">
                  <nuxt-img
                    v-for="(picture, key) in imageSlotProps.image.slice(0, 2)"
                    :key="key"
                    class="sf-product-card__picture"
                    :src="picture"
                    :alt="imageSlotProps.title"
                    :width="imageSlotProps.imageWidth"
                    :height="imageSlotProps.imageHeight"
                  />
                </template>
                <nuxt-img
                  v-else
                  class="sf-product-card__image lol"
                  :src="imageSlotProps.image"
                  :alt="imageSlotProps.title"
                  :width="imageSlotProps.imageWidth"
                  :height="imageSlotProps.imageHeight"
                />
              </SfButton>
            </template>
          </SfProductCard>
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script>
import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader,
  SfButton
} from '@storefront-ui/vue';

import {
  productGetters, useUser, useWishlist,
} from '@vue-storefront/magento';
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { useAddToCart } from '~/helpers/cart/addToCart';
import { useImage } from '~/composables';

export default defineComponent({
  name: 'ProductsCarousel',
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader,
    SfButton,
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
    const { isInWishlist, addItem, removeItem } = useWishlist('GlobalWishlist');
    const {
      addItemToCart,
      isInCart,
    } = useAddToCart();

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

    const { getMagentoImage, imageSizes } = useImage();

    return {
      addItemToCart,
      addItemToWishlist,
      isAuthenticated,
      isInCart,
      isInWishlist,
      mappedProducts,
      productGetters,
      getMagentoImage,
      imageSizes,
    };
  },
});
</script>

<style lang="scss" scoped>
.section {
  margin-top: var(--spacer-base);
}

.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }

  &__item {
    margin: 1.9375rem 0 2.4375rem 0;
  }
}

</style>
