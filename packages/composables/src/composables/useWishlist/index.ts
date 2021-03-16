/* istanbul ignore file */

import { useWishlistFactory, UseWishlistFactoryParams, Context } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { Product, WishlistProduct, Wishlist } from '../../types';
import guestWishlist from './guest';

import useUser from '../useUser';

export const wishlist: Ref<Wishlist> = ref(null);

// @todo: implement wishlist
const params: UseWishlistFactoryParams<Wishlist, WishlistProduct, Product> = {
  provide() {
    return {
      user: useUser()
    };
  },

  load: async (context: Context) => {
    // is user authincated.
    if(context.user.user.value) {
      const result = await context.$ma.api.wishlist();
      return result.data.wishlist.items;
    }

    // return guest wishlist
    return guestWishlist.load();
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async ({ currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async ({ currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async ({ currentWishlist }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnWishlist: ({ currentWishlist }) => {
    return false;
  }
};

export default useWishlistFactory<Wishlist, WishlistProduct, Product>(params);
