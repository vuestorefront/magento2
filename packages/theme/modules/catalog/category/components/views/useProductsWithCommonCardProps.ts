import { computed, Ref, useContext } from '@nuxtjs/composition-api';
import {
  useImage, useUser,
} from '~/composables';
import useWishlist from '~/modules/wishlist/composables/useWishlist';
import {
  getName, getPrice, getProductSku, getProductThumbnailImage, getSlug,
} from '~/modules/catalog/product/getters/productGetters';
import { getAverageRating, getTotalReviews } from '~/getters/reviewGetters';
import { useAddToCart } from '~/helpers/cart/addToCart';
import type { Product } from '~/modules/catalog/product/types';

export const useProductsWithCommonProductCardProps = (products: Ref<Product[]>) => {
  const { getMagentoImage } = useImage();
  const { isInWishlist } = useWishlist();
  const { isAuthenticated } = useUser();
  const { isInCart } = useAddToCart();
  const context = useContext();

  /**
   * Most props of SfProductCard and SfProductCardHorizontal are the same.
   * To avoid passing tens of props to both components two times,
   * instead the below object is passed to them using `v-bind="product.commonProps"`
   */
  const productsWithCommonProductCardProps = computed(() => products.value.map((product, index) => {
    const imageProps = {
      image: getMagentoImage(getProductThumbnailImage(product)),
      imageTag: 'nuxt-img',
      nuxtImgConfig: { fit: 'cover' },
    };

    const wishlistProps = {
      isInWishlist: isInWishlist({ product }),
      isInWishlistIcon: isAuthenticated.value ? 'heart_fill' : '',
      wishlistIcon: isAuthenticated.value ? 'heart' : '',
    };

    const price = getPrice(product);

    const priceProps = {
      regularPrice: context.app.$fc(price.regular),
      specialPrice: price.special && context.app.$fc(getPrice(product).special),
    };

    const reviewProps = {
      reviewsCount: getTotalReviews(product),
      scoreRating: getAverageRating(product),
    };

    const link = context.app.localePath(`/p/${getProductSku(product)}${getSlug(product, product.categories[0])}`);

    const commonProps = {
      title: getName(product),
      link,
      style: { '--index': index }, // used for transition animation
      isAddedToCart: isInCart({ product }),
      ...imageProps,
      ...wishlistProps,
      ...priceProps,
      ...reviewProps,
    };

    return {
      ...product,
      commonProps,
    };
  }));
  return { productsWithCommonProductCardProps };
};
