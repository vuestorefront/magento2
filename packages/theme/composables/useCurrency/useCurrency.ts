import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { Currency } from '~/modules/GraphQL/types';

export interface UseCurrencyErrors {
  load: Error | null;
  change: Error | null;
}

export type UseCurrencyLoadParams = ComposableFunctionArgs<{}>;

export type UseCurrencyChangeParams = ComposableFunctionArgs<{ id: string }>;

export interface UseCurrencyInterface {
  load: (params?: UseCurrencyLoadParams) => Promise<void>;
  change: (params: UseCurrencyChangeParams) => void;
  currency: ComputedRef<Currency>;
  loading: Ref<boolean>;
  error: Ref<UseCurrencyErrors>;
}
