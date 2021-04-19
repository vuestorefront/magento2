import { Context } from '@vue-storefront/core';
import { Route, UseRouter } from '../../types';
import { useRouterFactory } from '../../factories/useRouterFactory';

const useRouter: (cacheId: string) => UseRouter<Route> = useRouterFactory <Route>({
  search: async (context: Context, url: string) => await context.$magento.api.urlResolver(url),
});

export default useRouter;
