/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams,
} from '@vue-storefront/core';
import {
  Wishlist,
  Product,
  WishlistProduct,
  WishlistQueryVariables,
} from '@vue-storefront/magento-api';
import useUser from '../useUser';

// @ts-ignore
const factoryParams: UseWishlistFactoryParams<Wishlist, WishlistProduct, Product> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // @ts-ignore
  load: async (context: Context, params) => {
    const apiState = context.$magento.config.state;

    if (apiState.getCustomerToken()) {
      const wishlistParams: WishlistQueryVariables = {
        ...(params.customQuery || {}),
      };
      const { data } = await context.$magento.api.wishlist(wishlistParams);

      return data.customer.wishlists;
    }

    return [];
  },
  addItem: async ({ currentWishlist, product }) => ({}),
  removeItem: async ({ currentWishlist, product }) => ({}),
  clear: async ({ currentWishlist }) => ({}),
  isInWishlist: ({ currentWishlist }) => false,
};

export default useWishlistFactory<Wishlist, WishlistProduct, Product>(factoryParams);
