import { defineStore } from 'pinia';
import { AvailableStores } from '~/composables/types';
import { Currency, StoreConfig } from '~/modules/GraphQL/types';

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
