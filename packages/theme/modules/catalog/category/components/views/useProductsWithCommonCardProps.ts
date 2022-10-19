import { computed, Ref, useContext } from '@nuxtjs/composition-api';
import type { Route } from 'vue-router';
import type { ImageModifiers } from '@nuxt/image';
import { useImage } from '~/composables';
import { useUser } from '~/modules/customer/composables/useUser';
import { useWishlist } from '~/modules/wishlist/composables/useWishlist';
import { useProduct } from '~/modules/catalog/product/composables/useProduct';
import {
  getName, getPrice, getProductThumbnailImage,
} from '~/modules/catalog/product/getters/productGetters';
import { getAverageRating, getTotalReviews } from '~/modules/review/getters/reviewGetters';
import { useAddToCart } from '~/helpers/cart/addToCart';
import type { Product } from '~/modules/catalog/product/types';

export interface ProductCommonCardProps {
  title: string;
  link: Route,
  style: Record<string, string | number> | string,
  isAddedToCart: boolean,

  image: string,
  imageTag: string,
  nuxtImgConfig: { [key in keyof ImageModifiers]?: ImageModifiers[key] },

  isInWishlist: boolean,
  isInWishlistIcon: string,
  wishlistIcon: string,

  regularPrice: string,
  specialPrice: string,
  maximumPrice: string,

  reviewsCount: number,
  scoreRating: number,
}

export type ProductWithCommonProductCardProps = Product & { commonProps: ProductCommonCardProps };

export const useProductsWithCommonProductCardProps = (products: Ref<Product[]>) => {
  const { getMagentoImage } = useImage();
  const { isInWishlist } = useWishlist();
  const { isAuthenticated } = useUser();
  const { isInCart } = useAddToCart();
  const { getProductPath } = useProduct();
  const context = useContext();

  /**
   * Most props of SfProductCard and SfProductCardHorizontal are the same.
   * To avoid passing tens of props to both components two times,
   * instead the below object is passed to them using `v-bind="product.commonProps"`
   */
  const productsWithCommonProductCardProps = computed<ProductWithCommonProductCardProps[]>(
    () => products.value.map((product, index) => {
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
        regularPrice: context.$fc(price.regular),
        specialPrice: price.special && context.$fc(getPrice(product).special),
        maximumPrice: price.maximum && context.$fc(getPrice(product).maximum),
      };

      const reviewProps = {
        reviewsCount: getTotalReviews(product),
        scoreRating: getAverageRating(product),
      };

      const link = context.localeRoute(getProductPath(product));

      const commonProps = {
        title: getName(product),
        link,
        style: { '--index': index }, // used for transition animation
        isAddedToCart: isInCart(product),
        ...imageProps,
        ...wishlistProps,
        ...priceProps,
        ...reviewProps,
      };

      return {
        ...product,
        commonProps,
      };
    }),
  );
  return { productsWithCommonProductCardProps };
};
