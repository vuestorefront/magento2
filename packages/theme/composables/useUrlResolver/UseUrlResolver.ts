import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import { RoutableInterface } from '~/modules/GraphQL/types';

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
 * Data and methods returned from the {@link useUrlResolver|useUrlResolver()} composable.
 *
 * @remarks
 *
 * `ROUTE_TYPE` is a generic type and can be one of: `CategoryTree`, `CmsPage`, `VirtualProduct`, `SimpleProduct`,
 * `DownloadableProduct`, `BundleProduct`, `GroupedProduct` or `ConfigurableProduct`
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
  search(): Promise<RoutableInterface>;
}
