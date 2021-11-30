import { Context } from '@vue-storefront/core';
import { AvailableStores, StoreConfig } from '@vue-storefront/magento-api';
import { useStoreFactory, UseStoreFactoryParams } from '../../factories/useStoreFactory';
import { UseStore } from '../../types/composables';
import useCart from '../useCart';

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
    context.$magento.config.state.setStore(store.store_code);

    context.cart.clear();
  },
};

const useStore: () => UseStore<AvailableStores, StoreConfig> = useStoreFactory<AvailableStores>(factoryParams);

export default useStore;
