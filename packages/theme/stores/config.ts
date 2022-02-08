import { defineStore } from 'pinia';
import { AvailableStores, StoreConfig } from '@vue-storefront/magento';

interface ConfigState {
  storeConfig: StoreConfig,
  stores: AvailableStores
}

export const useConfigStore = defineStore('magentoConfig', {
  state: (): ConfigState => ({
    storeConfig: {},
    stores: [],
  }),
});
