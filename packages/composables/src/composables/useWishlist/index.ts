/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
/* istanbul ignore file */
import { useWishlistFactory, UseWishlistFactoryParams, Context } from '@vue-storefront/core';
import { ref } from '@vue/composition-api';
import {
  Wishlist,
  Product,
  WishlistProduct,
  WishlistQueryVariables,
} from '@vue-storefront/magento-api';

import useUser from '../useUser';

export const wishlist = ref<Wishlist>(null);

const factoryParams: UseWishlistFactoryParams<Wishlist, WishlistProduct, Product> = {
  provide() {
    return {
      user: useUser(),
    };
  },

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
