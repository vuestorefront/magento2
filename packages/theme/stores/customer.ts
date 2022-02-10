import { defineStore } from 'pinia';
import { Wishlist, Cart } from '@vue-storefront/magento';

const wishlist: Wishlist = {};
const user: any = {};
const cart: Cart | {} = {};

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
