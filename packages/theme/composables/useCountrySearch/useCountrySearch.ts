import { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import { Countries, ComposableFunctionArgs } from '~/composables/types';
import { Maybe, Country } from '~/modules/GraphQL/types';

/**
 * Errors returned by the {@link useCountrySearch} composable
 */
export interface UseCountrySearchErrors {
  /** Error when searching for a country fails, otherwise is `null` */
  search: Error | null

  /** Error when loading the list of countries fails, otherwise is `null` */
  load: Error | null
}

/**
 * Params accepted by the `search` method in the {@link useCountrySearch} composable
 */
export type UseCountrySearchParams = ComposableFunctionArgs<{
  id: string;
}>;

/**
 * Represents data and methods returned from the {@link useCountrySearch} composable
 */
export interface UseCountrySearchInterface {
  /** Fetches the array of registered countries */
  load (): Promise<Array<Countries>>;
  /** Fetches a country by its id */
  search (params: UseCountrySearchParams): Promise<Maybe<Country>>;
  /** Returns the current state of search as computed boolean property */
  loading: DeepReadonly<Ref<boolean>>;
  /** Reactive object containing the error message, if search failed for any reason. */
  error: DeepReadonly<Ref<UseCountrySearchErrors>>;
}
