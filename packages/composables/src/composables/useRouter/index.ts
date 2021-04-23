import { Context } from '@vue-storefront/core';
import { Route } from '@vue-storefront/magento-api';
import { useRouterFactory, UseRouterFactoryParams } from '../../factories/useRouterFactory';

const factoryParams: UseRouterFactoryParams<Route> = {
  search: async (context: Context, url: string) => {
    const { data } = await context.$magento.api.urlResolver(url);

    return data.urlResolver;
  },
};

export default useRouterFactory<Route>(factoryParams);
