import { Middleware } from '@nuxt/types';
import { usePageStore } from '~/stores/page';
import { Logger } from '~/helpers/logger';
import { RoutableInterface } from '~/modules/GraphQL/types';

const urlResolverMiddleware : Middleware = async (context) => {
  const pageStore = usePageStore();
  const { path } = context.route;

  const clearUrl = path.replace(/[a-z]+\/[cp|]\//gi, '').replace(`/${context.i18n.locale}`, '');

  Logger.debug('middleware/url-resolver', clearUrl);

  const { data, errors } = await context.app.$vsf.$magento.api.route(clearUrl);

  Logger.debug('middleware/url-resolver/result', { data, errors });

  const results: RoutableInterface | null = data?.route ?? null;

  if (!results || errors?.length) context.error({ statusCode: 404 });

  pageStore.$patch((state) => {
    state.routeData = results;
  });
};

export default urlResolverMiddleware;
