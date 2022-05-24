import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { EntityUrl } from '~/modules/GraphQL/types';

/**
 * The {@link useUrlResolver} error object. The properties values' are the
 * errors thrown by its methods.
 */
export interface UseUrlResolverErrors {
  /**
   * Error when searching the resolver for current route URL fails, otherwise is
   * `null`.
   */
  search: Error | null;
}

/** The interface provided by {@link useUrlResolver} composable. */
export interface UseUrlResolverInterface {
  /** The current route path. */
  path: string;

  /**
   * Contains errors from any of the composable methods.
   *
   * @see {@link UseUrlResolverErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UseUrlResolverErrors>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /** Searches the resolver for current route URL. */
  search(): Promise<EntityUrl | {}>;
}
