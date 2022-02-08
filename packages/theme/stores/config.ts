import { defineStore } from 'pinia';
import { StoreConfig } from '@vue-storefront/magento';

const config: StoreConfig = {};

export const useConfigStore = defineStore('storeConfig', {
  state: () => ({
    config,
  }),
});
