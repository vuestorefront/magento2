import type { ComputedRef, DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { Currency } from '~/modules/GraphQL/types';

/**
 * Errors that occured in the {@link useCurrency|useCurrency()} composable
 */
export interface UseCurrencyErrors {
  /**
   * Contains error if `load` method failed, otherwise is `null`
   */
  load: Error | null;

  /**
   * Contains error if `change` method failed, otherwise is `null`
   */
  change: Error | null;
}

/**
 * The params object accepted by the `load` method in the {@link useCurrency|useCurrency()} composable
 */
export type UseCurrencyLoadParams = ComposableFunctionArgs<{}>;

/**
 * The params object accepted by the `change` method in the {@link useCurrency|useCurrency()} composable
 */
export type UseCurrencyChangeParams = { id: string };

/**
 * Data and methods returned from the {@link useCurrency|useCurrency()} composable
 */
export interface UseCurrencyInterface {
  /**
   * Loads the currency and updates the configuration store
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#currency} API endpoint
   * and accepts the custom queries named `currency`.
   */
  load(params?: UseCurrencyLoadParams): Promise<void>;

  /**
   * Changes the currency and reloads the page
   */
  change(params: UseCurrencyChangeParams): void;

  /**
   * Contains errors from the composable methods
   */
  error: DeepReadonly<Ref<UseCurrencyErrors>>;

  /**
   * The currency information object that contains its symbol, code and how it
   * should be displayed. It's a computed ref from currency state in the
   * configuration store.
   */
  currency: ComputedRef<Currency>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;
}
