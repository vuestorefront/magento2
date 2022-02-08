import {
  ref, Ref, useContext,
} from '@nuxtjs/composition-api';
import { Logger } from '@vue-storefront/core';
import { StoreConfig } from '@vue-storefront/magento-api';
import { storeConfigGetters } from '@vue-storefront/magento';
import { UseStoreInterface, UseStore, UseStoreErrors } from '~/composables/useStore/useStore';

const useStore: UseStore = (): UseStoreInterface => {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseStoreErrors> = ref({ load: null, change: null });
  const stores: Ref = ref([]);
  const { app } = useContext();

  const load = async (customQuery = { availableStores: 'availableStores' }): Promise<void> => {
    Logger.debug('useStoreFactory.load');
    error.value.load = null;

    try {
      loading.value = true;
      const { data } = await app.$vsf.$magento.api.availableStores(customQuery);

      stores.value = data.availableStores || [];
    } catch (err) {
      error.value.load = err;
    } finally {
      loading.value = false;
    }
  };

  const change = (store: StoreConfig) => {
    Logger.debug('useStoreFactory.change');

    error.value.change = null;

    try {
      loading.value = true;
      app.$vsf.$magento.config.state.setStore(storeConfigGetters.getCode(store));
      app.$vsf.$magento.config.state.setCurrency(storeConfigGetters.getCurrency(store));
      app.$vsf.$magento.config.state.setLocale(storeConfigGetters.getCode(store));
    } catch (err) {
      error.value.change = err;
    }

    loading.value = false;
  };

  return {
    load,
    change,
    stores,
    loading,
    error,
  };
};

export default useStore;
