import { Ref } from '@nuxtjs/composition-api';
import { StoreConfig, AvailableStoresQuery } from '~/modules/GraphQL/types';

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

export interface UseStoreErrors {
  load: Error | null;
  change: Error | null;
}

export declare type AvailableStores = AvailableStoresQuery['availableStores'];
