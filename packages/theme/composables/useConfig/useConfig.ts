import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { StoreConfig } from '~/modules/GraphQL/types';

export interface UseConfigErrors {
  load: Error | null;
}

export type UseConfigInterface = {
  config: ComputedRef<StoreConfig>,
  loading: Ref<boolean>,
  load (): Promise<void>
};
