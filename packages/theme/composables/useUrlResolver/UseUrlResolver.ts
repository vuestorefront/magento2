import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { EntityUrl } from '~/modules/GraphQL/types';

/**
 * Errors that occured in the {@link UseUrlResolverErrors|UseUrlResolverErrors()} composable
 */
export interface UseUrlResolverErrors {
  /**
   * Contains error if `search` method failed, otherwise is `null`
   */
  search: Error | null;
}

/**
 * Data and methods returned from the {@link useUrlResolver|useUrlResolver()} composable
 */
export interface UseUrlResolverInterface {
  /**
   * The current route path
   */
  path: string;

  /**
   * Contains errors from the composable methods
   */
  error: DeepReadonly<Ref<UseUrlResolverErrors>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Searches the resolver for current route URL
   */
  search(): Promise<EntityUrl | {}>;
}
