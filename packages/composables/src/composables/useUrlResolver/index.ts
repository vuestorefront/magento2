import { Context, Logger } from '@vue-storefront/core';
import { Route } from '@vue-storefront/magento-api';
import { useUrlResolverFactory, UseUrlResolverFactoryParams } from '../../factories/useUrlResolverFactory';
import { UseUrlResolver } from '../../types/composables';

const factoryParams: UseUrlResolverFactoryParams<Route> = {
  search: async (context: Context, url: string) => {
    Logger.debug('[Magento] Find information based on URL', { url });
    const clearUrl = url.replace(/\/[cp|]\//gi, '');

    const { data } = await context.$magento.api.urlResolver(clearUrl);

    Logger.debug('[Result]:', { data });

    return data.urlResolver;
  },
};
const useUrlResolver: (cacheId?: string) => UseUrlResolver<Route> = useUrlResolverFactory<Route>(factoryParams);

export default useUrlResolver;
