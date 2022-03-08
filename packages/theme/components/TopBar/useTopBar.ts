import { ref, onMounted } from '@nuxtjs/composition-api';

import useApi from '~/composables/useApi';
import checkStoresAndCurrencyQuery from './checkStoresAndCurrency.gql';

export const useTopBar = () => {
  const { query } = useApi();
  const hasStoresToSelect = ref(null);
  const hasCurrencyToSelect = ref(null);

  onMounted(() => {
    query(checkStoresAndCurrencyQuery)
      .then((data) => {
        hasStoresToSelect.value = data?.availableStores?.length;
        hasCurrencyToSelect.value = data?.currency?.available_currency_codes?.length > 1;

        return data;
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
