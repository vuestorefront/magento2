import { Context } from '@vue-storefront/core';
import { Route } from '@vue-storefront/magento-api';
import { useUrlResolverFactory, UseUrlResolverFactoryParams } from '../../factories/useUrlResolverFactory';
import { UseUrlResolver } from '../../types';

const factoryParams: UseUrlResolverFactoryParams<Route> = {
  search: async (context: Context, url: string) => {
    const clearUrl = url.replace(/\/[c|p]\//gi, '');

    const { data } = await context.$magento.api.urlResolver(clearUrl);

    return data.urlResolver;
  },
};
const useUrlResolver: (cacheId: string) => UseUrlResolver<Route> = useUrlResolverFactory<Route>(factoryParams);

export default useUrlResolver;
