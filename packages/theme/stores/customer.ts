import { defineStore } from 'pinia';
import type { Wishlist, Cart } from '~/modules/GraphQL/types';
import type { User } from '~/modules/customer/composables/useUser/useUser';

interface CustomerState {
  wishlist: Wishlist,
  cart: Cart,
  user: User | null,
  isLoggedIn: boolean,
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    wishlist: { items_count: 0 },
    user: null,
    cart: {
      id: '', is_virtual: false, total_quantity: 0, shipping_addresses: [],
    },
    isLoggedIn: false,
  }),
  actions: {
    setIsLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
    },
  },
});
