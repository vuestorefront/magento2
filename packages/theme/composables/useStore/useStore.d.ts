import { AvailableStores, StoreConfig } from '@vue-storefront/magento-api';
import { Ref } from '@nuxtjs/composition-api';
import { UseStoreErrors } from '@vue-storefront/core';

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
