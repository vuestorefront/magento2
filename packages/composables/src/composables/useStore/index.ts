/**
 * @deprecated since version1.0.0
 */
import { Context } from '@vue-storefront/core';
import { AvailableStores, StoreConfig } from '@vue-storefront/magento-api';
import { useStoreFactory, UseStoreFactoryParams } from '../../factories/useStoreFactory';
import { UseStore } from '../../types/composables';
import useCart from '../useCart';
import StoreConfigGetters from '../../getters/storeConfigGetters';

const factoryParams: UseStoreFactoryParams<AvailableStores, StoreConfig> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: Context): Promise<AvailableStores> => {
    const { data } = await context.$magento.api.availableStores();

    return data.availableStores || [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change: (context: Context, store) => {
    context.$magento.config.state.setStore(StoreConfigGetters.getCode(store));
    context.$magento.config.state.setCurrency(StoreConfigGetters.getCurrency(store));
    context.$magento.config.state.setLocale(StoreConfigGetters.getCode(store));
  },
};

const useStore: () => UseStore<AvailableStores, StoreConfig> = useStoreFactory<AvailableStores, StoreConfig>(factoryParams);

export default useStore;
