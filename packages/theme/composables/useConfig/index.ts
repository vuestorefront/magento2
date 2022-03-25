import {
  computed, ref, useContext,
} from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useConfigStore } from '~/stores/config';
import { UseConfig, UseConfigErrors } from '~/composables/useConfig/useConfig';

const useConfig = (): UseConfig => {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseConfigErrors>({ load: null });
  const configStore = useConfigStore();
  const config = computed(() => configStore.storeConfig);

  const load = async () => {
    error.value.load = null;
    loading.value = true;

    Logger.debug('useConfig/load');

    try {
      const { data } = await app.$vsf.$magento.api.storeConfig();
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
    loading,
    load,
  };
};

export default useConfig;
