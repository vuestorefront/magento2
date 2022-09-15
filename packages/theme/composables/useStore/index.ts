import {
  computed,
  readonly,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import type { Ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useConfigStore } from '~/stores/config';
import type { StoreConfig } from '~/modules/GraphQL/types';
import type { UseStoreInterface, UseStoreErrors } from '~/composables/useStore/useStore';

/**
 * Allows loading and changing currently active store.
 *
 * See the {@link UseStoreInterface} for a list of methods and values available in this composable.
 */
export function useStore(): UseStoreInterface {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseStoreErrors> = ref({
    load: null,
    change: null,
  });
  const configStore = useConfigStore();
  const { app } = useContext();

  const load = async (customQuery = { availableStores: 'availableStores' }, customHeaders = {}): Promise<void> => {
    Logger.debug('useStoreFactory.load');
    error.value.load = null;

    try {
      loading.value = true;
      const { data } = await app.$vsf.$magento.api.availableStores(customQuery, customHeaders);

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
    stores: computed(() => configStore.stores),
    load,
    change,
    loading: readonly(loading),
    error: readonly(error),
  };
}

export default useStore;
export * from './useStore';
