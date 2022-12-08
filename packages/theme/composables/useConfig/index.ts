import {
  computed, readonly, ref, useContext,
} from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useConfigStore } from '~/stores/config';
import type { UseConfigErrors, UseConfigInterface, UseConfigLoadParams } from './useConfig';

/**
 * Allows interacting with the store configuration.
 *
 * See the {@link UseConfigInterface} for a list of methods and values available in this composable.
 */
export function useConfig(): UseConfigInterface {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseConfigErrors>({ load: null });
  const configStore = useConfigStore();
  const config = computed(() => configStore.storeConfig);

  const load = async (params?: UseConfigLoadParams) => {
    error.value.load = null;
    loading.value = true;

    Logger.debug('useConfig/load');

    try {
      const { data } = await app.$vsf.$magento.api.storeConfig(params?.customQuery ?? null, params?.customHeaders);
      configStore.$patch((state) => {
        state.storeConfig = data.storeConfig || {};
      });
    } catch (err) {
      Logger.debug('[ERROR] useConfig/load', err);
      error.value.load = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    config,
    loading: readonly(loading),
    load,
  };
}

export * from './useConfig';
export default useConfig;
