import { defineStore } from 'pinia';
import type { Wishlist } from '~/modules/GraphQL/types';

interface WishlistState {
  wishlist: Wishlist,
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): WishlistState => ({
    wishlist: { items_count: 0 },
  }),
});
