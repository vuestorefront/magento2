import { Context, Logger } from '@absolute-web/vsf-core';
import { Route } from '@absolute-web/magento-api';
import { useCache } from '@absolute-web/vsf-cache';
import { useUrlResolverFactory, UseUrlResolverFactoryParams } from '../../factories/useUrlResolverFactory';
import { UseUrlResolver } from '../../types/composables';

const factoryParams: UseUrlResolverFactoryParams<Route> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  search: async (context: Context, params) => {
    Logger.debug('[Magento] Find information based on URL', { params });
    const clearUrl = params.url.replace(/\/[cp|]\//gi, '');

    const { data } = await context.$magento.api.urlResolver(clearUrl);

    if (data?.cacheTags) {
      context.cache.addTagsFromString(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.urlResolver;
  },
};
const useUrlResolver: (cacheId?: string) => UseUrlResolver<Route> = useUrlResolverFactory<Route>(factoryParams);

export default useUrlResolver;
