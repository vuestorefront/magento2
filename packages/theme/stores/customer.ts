import { defineStore } from 'pinia';
import { Wishlist } from '@vue-storefront/magento';

const wishlist: Wishlist = {};

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    wishlist,
  }),
});
