import {
  readonly,
  ref,
  useRoute,
  useContext,
} from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type { EntityUrl } from '~/modules/GraphQL/types';
import type { UseUrlResolverErrors, UseUrlResolverInterface } from './UseUrlResolver';

/**
 * The `useUrlResolver()` composable allows searching the resolver for current
 * route path (URL).
 */
export function useUrlResolver(): UseUrlResolverInterface {
  const route = useRoute();
  const { error: nuxtError, app } = useContext();
  const context = app.$vsf;
  const { path } = route.value;
  const loading = ref(false);
  const error = ref<UseUrlResolverErrors>({
    search: null,
  });

  const search = async (): Promise<EntityUrl | {}> => {
    loading.value = true;
    let results: EntityUrl = {};

    try {
      const clearUrl = path.replace(/[a-z]+\/[cp|]\//gi, '');
      Logger.debug('[Magento] Find information based on URL', { clearUrl });
      const { data } = await context.$magento.api.urlResolver(clearUrl);
      results = data.urlResolver;

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
