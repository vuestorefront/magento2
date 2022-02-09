import { defineStore } from 'pinia';
import { Wishlist } from '@vue-storefront/magento';

const wishlist: Wishlist = {};
const user: any = {};

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    wishlist,
    user
  }),
});
