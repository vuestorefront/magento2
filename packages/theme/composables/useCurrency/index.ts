import { ref, computed, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useConfigStore } from '~/stores/config';
import type {
  UseCurrencyInterface,
  UseCurrencyErrors,
  UseCurrencyLoadParams,
  UseCurrencyChangeParams,
} from './useCurrency';

function useCurrency(): UseCurrencyInterface {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseCurrencyErrors>({ load: null, change: null });
  const configStore = useConfigStore();
  const currency = computed(() => configStore.currency);

  const load = async (params?: UseCurrencyLoadParams) => {
    error.value.load = null;
    loading.value = true;

    Logger.debug('useCurrency/load');

    try {
      const { data } = await app.$vsf.$magento.api.currency(params);
      configStore.$patch((state) => {
        state.currency = data?.currency ?? {};
      });
    } catch (err) {
      Logger.debug('[ERROR] useCurrency/load', err);
      error.value.load = err;
    } finally {
      loading.value = false;
    }
  };

  const change = (params: UseCurrencyChangeParams) => {
    error.value.change = null;
    loading.value = true;

    Logger.debug('useCurrency/change');

    try {
      app.$vsf.$magento.config.state.setCurrency(params.id);
      window.location.reload();
    } catch (err) {
      Logger.debug('[ERROR] useCurrency/change', err);
      error.value.change = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    load,
    change,
    currency,
    loading,
    error,
  };
}

export default useCurrency;
