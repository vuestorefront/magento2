import { Ref } from '@nuxtjs/composition-api';
import { StoreConfig } from '~/modules/GraphQL/types';
import { UseStoreErrors, AvailableStores } from '~/composables/types';

export interface UseStoreInterface {
  change(store: StoreConfig): void;
  load(customQuery?: { availableStores: string }): Promise<void>;
  stores: Ref<AvailableStores>,
  loading: Ref<boolean>,
  error: Ref<UseStoreErrors>,
}

export interface UseStore {
  (): UseStoreInterface;
}

export { UseStoreErrors } from '@vue-storefront/core';
