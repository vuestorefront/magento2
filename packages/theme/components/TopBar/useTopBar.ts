import { ref, onMounted } from '@nuxtjs/composition-api';
import type { Currency, StoreConfig } from '~/modules/GraphQL/types';

import { useApi } from '~/composables/useApi';
import checkStoresAndCurrencyQuery from './checkStoresAndCurrency.gql';

type StoresAndCurrencyQueryResponse = {
  availableStores: Pick<StoreConfig, 'store_code'>[],
  currency: Pick<Currency, 'available_currency_codes'>,
};

export const useTopBar = () => {
  const { query } = useApi();
  const hasStoresToSelect = ref<boolean | null>(null);
  const hasCurrencyToSelect = ref<boolean | null>(null);

  onMounted(() => {
    query<StoresAndCurrencyQueryResponse>(checkStoresAndCurrencyQuery)
      .then((response) => {
        // eslint-disable-next-line promise/always-return
        hasStoresToSelect.value = response?.data?.availableStores.length > 1 ?? false;
        // eslint-disable-next-line promise/always-return
        hasCurrencyToSelect.value = response?.data?.currency.available_currency_codes.length > 1 ?? false;
      })
      .catch(() => {
        hasStoresToSelect.value = false;
        hasCurrencyToSelect.value = false;
      });
  });

  return {
    hasStoresToSelect,
    hasCurrencyToSelect,
  };
};

export default useTopBar;
