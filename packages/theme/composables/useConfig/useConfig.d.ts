import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { StoreConfig } from '@vue-storefront/magento';

export type UseConfig = {
  config: ComputedRef<StoreConfig>,
  loading: Ref<boolean>,
  loadConfig (): Promise<void>
};
