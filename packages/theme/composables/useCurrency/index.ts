import {
  ref, computed, useContext,
} from '@nuxtjs/composition-api';
import { UseCurrency, UseCurrencyErrors } from '~/composables/useCurrency/useCurrency';
import { ComposableFunctionArgs, CustomQuery } from '~/composables/types';
import { Logger } from '~/helpers/logger';
import { useConfigStore } from '~/stores/config';

const useCurrency = (): UseCurrency => {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseCurrencyErrors>({ load: null, change: null });
  const configStore = useConfigStore();
  const currency = computed(() => configStore.currency);

  const load = async (params?: ComposableFunctionArgs<CustomQuery>) => {
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

  const change = (params: ComposableFunctionArgs<{ id: string }>) => {
    error.value.change = null;
    loading.value = true;

    Logger.debug('useCurrency/change');

    try {
      app.$vsf.$magento.config.state.setCurrency(params.id);
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
};

export default useCurrency;
