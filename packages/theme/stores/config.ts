import { defineStore } from 'pinia';
import { StoreConfig } from '@vue-storefront/magento';

const value: StoreConfig = {};

export const useConfigStore = defineStore('storeConfig', {
  state: () => ({
    value,
  }),
});
