import { defineStore } from 'pinia';
import type { Cart } from '~/modules/GraphQL/types';

interface CustomerState {
  cart: Cart,
}

export const useCartStore = defineStore('cart', {
  state: (): CustomerState => ({
    cart: {
      id: '', is_virtual: false, total_quantity: 0, shipping_addresses: [],
    },
  }),
});
