import {
  ref, computed, Ref, useContext,
} from '@nuxtjs/composition-api';
import { Context, Logger } from '@vue-storefront/core';
import { AvailableStores, StoreConfig } from '@vue-storefront/magento-api';
import { storeConfigGetters } from '@vue-storefront/magento';
import { UseStoreInterface, UseStore, UseStoreErrors } from '~/composables/useStore/useStore';

const useStore: UseStore<AvailableStores> = (): UseStoreInterface<AvailableStores> => {
  const response: Ref<AvailableStores | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseStoreErrors> = ref({ load: null, change: null });
  const { app } = useContext();

  const load = async (context: Context) => {
    Logger.debug('useStoreFactory.load', context);

    error.value.load = null;

    try {
      loading.value = true;
      const { customQuery } = context;
      response.value = await app.$vsf.$magento.api.availableStores(
        { availableStores: 'availableStores', ...customQuery },
      );
    } catch (err) {
      error.value.load = err;
    } finally {
      loading.value = false;
    }
  };

  const change = (context: Context) => {
    Logger.debug('useStoreFactory.change', context);

    error.value.change = null;

    try {
      loading.value = true;
      // @ts-ignore
      const { store }: { store: StoreConfig } = context;

      context.$magento.config.state.setStore(storeConfigGetters.getCode(store));
      context.$magento.config.state.setCurrency(storeConfigGetters.getCurrency(store));
      context.$magento.config.state.setLocale(storeConfigGetters.getCode(store));
    } catch (err) {
      error.value.change = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    load,
    change,
    response: computed(() => response.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};

export default useStore;
