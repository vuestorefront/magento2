import { defineStore } from 'pinia';
import { AvailableStores, Currency, StoreConfig } from '~/composables/types';

interface ConfigState {
  storeConfig: StoreConfig,
  stores: AvailableStores
  currency: Currency
}

export const useConfigStore = defineStore('magentoConfig', {
  state: (): ConfigState => ({
    storeConfig: {},
    stores: [],
    currency: {},
  }),
});