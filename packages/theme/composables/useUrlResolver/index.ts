import {
  readonly,
  ref,
  useRoute,
  useContext,
} from '@nuxtjs/composition-api';
import type { RoutableInterface } from '@vue-storefront/magento-api';
import { Logger } from '~/helpers/logger';
import type { UseUrlResolverErrors, UseUrlResolverInterface } from '~/composables';

/**
 * Allows searching the resolver for current
 * route path (URL).
 *
 * See the {@link UseUrlResolverInterface} for a list of methods and values available in this composable.
 */
export function useUrlResolver<ROUTE_TYPE extends RoutableInterface>(): UseUrlResolverInterface<ROUTE_TYPE> {
  const route = useRoute();
  const { error: nuxtError, app } = useContext();
  const context = app.$vsf;
  const { path } = route.value;
  const loading = ref(false);
  const error = ref<UseUrlResolverErrors>({
    search: null,
  });

  const search = async (): Promise<ROUTE_TYPE> => {
    loading.value = true;
    let results: ROUTE_TYPE | null = null;

    try {
      const clearUrl = path.replace(/[a-z]+\/[cp|]\//gi, '');
      Logger.debug('[Magento] Find information based on URL', { clearUrl });
      const { data } = await context.$magento.api.route(clearUrl);
      // @ts-ignore
      results = data.route;

      if (!results) nuxtError({ statusCode: 404 });

      Logger.debug('[Result]:', { results });
    } catch (err) {
      error.value.search = err;

      Logger.error('useUrlResolver/search', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  return {
    path,
    search,
    error: readonly(error),
    loading: readonly(loading),
  };
}

export * from './UseUrlResolver';
export default useUrlResolver;
