/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
/* istanbul ignore file */
import { useWishlistFactory, UseWishlistFactoryParams, Context } from '@vue-storefront/core';
import { ref } from '@vue/composition-api';
import { Product, WishlistProduct, Wishlist } from '../../types';

import useUser from '../useUser';

export const wishlist = ref<Wishlist>(null);

// @todo: implement wishlist
const factoryParams: UseWishlistFactoryParams<Wishlist, WishlistProduct, Product> = {
  provide() {
    return {
      user: useUser(),
    };
  },

  load: async (context: Context) => {
    // is user authenticated.
    const apiState = context.$ma.config.state;

    if (apiState.getCustomerToken()) {
      const result = await context.$ma.api.wishlist();
      return result.data.wishlist;
    }

    return [];
  },
  addItem: async ({ currentWishlist, product }) => ({}),
  removeItem: async ({ currentWishlist, product }) => ({}),
  clear: async ({ currentWishlist }) => ({}),
  isInWishlist: ({ currentWishlist }) => false,
};

export default useWishlistFactory<Wishlist, WishlistProduct, Product>(factoryParams);
