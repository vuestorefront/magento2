import {
  computed,
  ref, Ref, useContext,
} from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { StoreConfig } from '~/modules/GraphQL/types';
import { UseStoreInterface, UseStore, UseStoreErrors } from '~/composables/useStore/useStore';
import { useConfigStore } from '~/stores/config';

const useStore: UseStore = (): UseStoreInterface => {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseStoreErrors> = ref({ load: null, change: null });
  const configStore = useConfigStore();
  const stores = computed(() => configStore.stores);
  const { app } = useContext();

  const load = async (customQuery = { availableStores: 'availableStores' }): Promise<void> => {
    Logger.debug('useStoreFactory.load');
    error.value.load = null;

    try {
      loading.value = true;
      const { data } = await app.$vsf.$magento.api.availableStores(customQuery);

      configStore.$patch((state) => {
        state.stores = data?.availableStores ?? [];
      });
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
      app.$vsf.$magento.config.state.setStore(store.store_code);
      app.$vsf.$magento.config.state.setCurrency(store.default_display_currency_code);
      app.$vsf.$magento.config.state.setLocale(store.store_code);
      const newStoreUrl = app.switchLocalePath(store.store_code);
      window.location.replace(newStoreUrl);
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
