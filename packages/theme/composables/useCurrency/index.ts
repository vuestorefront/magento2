import { ref, computed, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useConfigStore } from '~/stores/config';
import type { UseCurrency, UseCurrencyErrors } from './useCurrency';
import type { ComposableFunctionArgs, CustomQuery } from '../types';

const useCurrency = (): UseCurrency => {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseCurrencyErrors>({ load: null, change: null });
  const configStore = useConfigStore();
  const currency = computed(() => configStore.currency);

  const load = async (params?: ComposableFunctionArgs<{}>) => {
    error.value.load = null;
    loading.value = true;

    Logger.debug('useCurrency/load');

    try {
      const { data } = await app.$vsf.$magento.api.currency(params?.customQuery ?? null);
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

  const change = (params: { id: string }) => {
    error.value.change = null;
    Logger.debug('useCurrency/change');

    try {
      app.$vsf.$magento.config.state.setCurrency(params.id);
      window.location.reload();
    } catch (err) {
      Logger.debug('[ERROR] useCurrency/change', err);
      error.value.change = err;
    }
  };

  return {
    load,
    change,
    currency,
    loading,
    error,
  };
};

export default useCurrency;
