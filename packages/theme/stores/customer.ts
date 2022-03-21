import { defineStore } from 'pinia';
import { Wishlist, Cart } from '~/composables/types';

const wishlist: Wishlist = { items_count: 0 };
const user: any = {};
const cart: Cart = { id: '', is_virtual: false, total_quantity: 0, shipping_addresses: [] };

interface CustomerState {
  wishlist,
  user,
  cart,
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    wishlist,
    user,
    cart,
  }),
});
