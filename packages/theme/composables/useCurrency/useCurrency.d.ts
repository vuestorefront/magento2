import { ComposableFunctionArgs } from '@vue-storefront/core';
import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { Currency } from '@vue-storefront/magento-api';

export interface UseCurrencyErrors {
  load: Error | null;
  change: Error | null;
}

export interface UseCurrency {
  load: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  change: (params: ComposableFunctionArgs<{ id: string }>) => void;
  currency: ComputedRef<Currency>;
  loading: Ref<boolean>;
  error: Ref<UseCurrencyErrors>;
}
