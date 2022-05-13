import { defineStore } from 'pinia';
import type { Cart, Customer } from '~/modules/GraphQL/types';

interface CustomerState {
  cart: Cart,
  user: Customer | null,
  isLoggedIn: boolean,
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
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
