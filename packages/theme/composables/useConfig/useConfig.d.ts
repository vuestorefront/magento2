import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { StoreConfig } from '@vue-storefront/magento';

export interface UseConfigErrors {
  load: Error | null;
}

export type UseConfig = {
  config: ComputedRef<StoreConfig>,
  loading: Ref<boolean>,
  load (): Promise<void>
};
