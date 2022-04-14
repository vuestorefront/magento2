import type { ComputedRef, DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs, CustomQuery } from '~/composables/types';
import type { Currency } from '~/modules/GraphQL/types';

/**
 * The {@link useCurrency} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseCurrencyErrors {
  /** Error when loading the currency, otherwise is `null`. */
  load: Error | null;

  /** Error when changing the currency, otherwise is `null`. */
  change: Error | null;
}

/** The params received by {@link useCurrency}'s `load` method. */
export type UseCurrencyLoadParams = ComposableFunctionArgs<CustomQuery>;

/** The params received by {@link useCurrency}'s `change` method. */
export type UseCurrencyChangeParams = ComposableFunctionArgs<{ id: string }>;

/** The interface provided by {@link useCurrency} composable. */
export interface UseCurrencyInterface {
  /** Loads the currency and updates the configuration store. */
  load(params?: UseCurrencyLoadParams): Promise<void>;

  /** Changes the currency and reloads the page. */
  change(params: UseCurrencyChangeParams): void;

  /** Contains errors from any of the composable methods. */
  error: DeepReadonly<Ref<UseCurrencyErrors>>;

  /**
   * An object from configuration store that contains currency information, e.g.
   * its symbol, code and how it should be displayed.
   */
  currency: ComputedRef<Currency>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;
}
