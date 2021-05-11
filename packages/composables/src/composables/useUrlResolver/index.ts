import { Context } from '@vue-storefront/core';
import { Route } from '@vue-storefront/magento-api';
import { useUrlResolverFactory, UseUrlResolverFactoryParams } from '../../factories/useUrlResolverFactory';

const factoryParams: UseUrlResolverFactoryParams<Route> = {
  search: async (context: Context, url: string) => {
    const clearUrl = url.replace(/\/[c|p]\//gi, '');

    const { data } = await context.$magento.api.urlResolver(clearUrl);

    return data.urlResolver;
  },
};

export default useUrlResolverFactory<Route>(factoryParams);
