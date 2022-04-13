import { ref, computed, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useConfigStore } from '~/stores/config';
import type { UseCurrency, UseCurrencyErrors } from './useCurrency';
import type { ComposableFunctionArgs, CustomQuery } from '../types';
import { useLoading } from '../useLoading';

const useCurrency = (): UseCurrency => {
  const { app } = useContext();
  const { loading, withLoading } = useLoading();
  const error = ref<UseCurrencyErrors>({ load: null, change: null });
  const configStore = useConfigStore();
  const currency = computed(() => configStore.currency);

  const load = withLoading(async (params?: ComposableFunctionArgs<CustomQuery>) => {
    error.value.load = null;

    Logger.debug('useCurrency/load');

    try {
      const { data } = await app.$vsf.$magento.api.currency(params);
      configStore.$patch((state) => {
        state.currency = data?.currency ?? {};
      });
    } catch (err) {
      Logger.debug('[ERROR] useCurrency/load', err);
      error.value.load = err;
    }
  });

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
