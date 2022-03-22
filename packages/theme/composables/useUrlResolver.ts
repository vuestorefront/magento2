import { useRoute, useContext, ref } from '@nuxtjs/composition-api';
import { Logger } from '@vue-storefront/core';
import { Maybe, UrlResolverQuery } from '~/modules/GraphQL/types';

export const useUrlResolver = () => {
  const route = useRoute();
  const { error: nuxtError, app } = useContext();
  const context = app.$vsf;
  const { path } = route.value;
  const loading = ref(false);
  const error = ref({
    search: null,
  });

  const search = async (): Promise<Maybe<UrlResolverQuery>> => {
    loading.value = true;
    let results = null;

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
    error,
    search,
    loading,
  };
};
