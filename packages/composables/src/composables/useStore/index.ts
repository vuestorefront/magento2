import { Context } from '@vue-storefront/core';
import { AvailableStores, StoreConfig } from '@vue-storefront/magento-api';
import { useStoreFactory, UseStoreFactoryParams } from '../../factories/useStoreFactory';
import { UseStore } from '../../types/composables';

const factoryParams: UseStoreFactoryParams<AvailableStores, StoreConfig> = {
  load: async (context: Context): Promise<AvailableStores> => {
    const { data } = await context.$magento.api.availableStores();

    return data.availableStores || [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change: async (context: Context, { store_code }) => {
    // const a = await context.$magento.config.state.setStore(store_code);

    return Promise.resolve();
  },
};

const useStore: () => UseStore<AvailableStores, StoreConfig> = useStoreFactory<AvailableStores>(factoryParams);

export default useStore;
