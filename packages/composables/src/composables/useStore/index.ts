import { Context } from '@absolute-web/vsf-core';
import { AvailableStores, StoreConfig } from '@absolute-web/magento-api';
import { useStoreFactory, UseStoreFactoryParams } from '../../factories/useStoreFactory';
import { UseStore } from '../../types/composables';
import StoreConfigGetters from '../../getters/storeConfigGetters';

const factoryParams: UseStoreFactoryParams<AvailableStores, StoreConfig> = {
  load: async (context: Context, params): Promise<AvailableStores> => {
    const { data } = await context.$magento.api.availableStores();

    return data.availableStores || [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change: (context: Context, store) => {
    context.$magento.config.state.setStore(StoreConfigGetters.getCode(store));
    context.$magento.config.state.setCurrency(StoreConfigGetters.getCurrency(store));
    context.$magento.config.state.setLocale(StoreConfigGetters.getLocale(store));

    // We don't want to clear the cart
    // context.cart.clear();
  },
};

const useStore: () => UseStore<AvailableStores, StoreConfig> = useStoreFactory<AvailableStores, StoreConfig>(factoryParams);

export default useStore;
