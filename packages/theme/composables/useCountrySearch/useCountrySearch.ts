import { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import { Countries, ComposableFunctionArgs } from '~/composables/types';
import { Maybe, Country } from '~/modules/GraphQL/types';

/**
 * Errors that occured in the {@link useCountrySearch|useCountrySearch()} composable
 */
export interface UseCountrySearchErrors {
  /**
   * Contains error if `search` method failed, otherwise is `null`
   */
  search: Error | null

  /**
   * Contains error if `load` method failed, otherwise is `null`
   */
  load: Error | null
}

/**
 * The params object accepted by the `save`, `update` and `remove` methods in the {@link useCountrySearch|useCountrySearch()} composable
 */
export type UseCountrySearchParams = ComposableFunctionArgs<{
  id: string;
}>;

/**
 * Data and methods returned from the {@link useCountrySearch|useCountrySearch()} composable
 */
export interface UseCountrySearchInterface {
  /**
   * Fetches the array of registered countries
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#country} API endpoint
   * and accepts the custom queries named `country`.
   */
  load(): Promise<Array<Countries>>;

  /**
   * Fetches a country by its id
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#countries} API endpoint
   * and accepts the custom queries named `countries`.
   */
  search(params: UseCountrySearchParams): Promise<Maybe<Country>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: DeepReadonly<Ref<boolean>>;

  /**
   * Contains errors from the composable methods
   */
  error: DeepReadonly<Ref<UseCountrySearchErrors>>;
}
