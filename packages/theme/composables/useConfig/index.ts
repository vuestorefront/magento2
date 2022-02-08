import {
  computed, ref, useContext,
} from '@nuxtjs/composition-api';
import { Logger } from '@vue-storefront/core';
import { useConfigStore } from '~/stores/config';
import { UseConfig } from '~/composables/useConfig/useConfig';

const useConfig = (): UseConfig => {
  const { app } = useContext();
  const loading = ref(false);
  const configStore = useConfigStore();

  const loadConfig = async () => {
    Logger.debug('useConfig/loadConfig');
    loading.value = true;
    try {
      const { data } = await app.$vsf.$magento.api.storeConfig();
      configStore.$patch((state) => {
        state.storeConfig = data.storeConfig || {};
      });
    } catch (err) {
      Logger.debug(err);
    }

    loading.value = false;
  };

  return {
    config: computed(() => configStore.storeConfig),
    loading,
    loadConfig,
  };
};

export default useConfig;
