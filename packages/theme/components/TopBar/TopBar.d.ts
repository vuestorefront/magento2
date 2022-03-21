import { AvailableStores, Currency } from '~/composables/types';

export type CheckStoresAndCurrencyQueryResponse = {
  availableStores: AvailableStores,
  currency: Currency
};
