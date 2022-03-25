import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { Currency } from '~/modules/GraphQL/types';

export interface UseCurrencyErrors {
  load: Error | null;
  change: Error | null;
}

export interface UseCurrency {
  load: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  change: (params: ComposableFunctionArgs<{ id: string }>) => Promise<void>;
  currency: ComputedRef<Currency>;
  loading: Ref<boolean>;
  error: Ref<UseCurrencyErrors>;
}
