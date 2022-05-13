import { GraphQLClient } from 'graphql-request';
import type { Plugin, Context as NuxtContext } from '@nuxt/types';

/**
 * Workaround for the fact that graphql-request does not support dynamic headers
 * If you passed new GraphQLClient(baseUrl, {headers: { Authorization: getCustomerToken() }})
 * the Authorization header would never be updated (even if you deleted the cookie in the browser)
 *
 * Under the hood, graphql-request spreads the headers passed to it (`...headers`) before each request
 * This proxy - when ...spread - intelligently returns only those object keys (which later become request headers)
 * whose corresponding cookie value exists
 *
 * @example
 * ```ts
 * const headers = getHeaderProxy(ctx);
 * setCustomerToken('abcd');
 * console.log(headers) // { Authorization: 'abcd' } (notice it's `headers`, not `headers()`)
 * // 'store' and 'Content-Currency' keys missing because their cookies aren't set'
 * ```
 * */
const getHeaderProxy = (ctx: NuxtContext) => {
  const { getCustomerToken, getStore, getCurrency } = ctx.app.$vsf.$magento.config.state;
  const proxyHandler : ProxyHandler<any> = {
    get(_target, key, _receiver) {
      return {
        Authorization: `Bearer ${getCustomerToken()}`,
        store: getStore(),
        'Content-Currency': getCurrency(),
      }[key] ?? undefined;
    },
    ownKeys() {
      // Important to get fresh values on each read of ownKeys
      const customerToken = getCustomerToken();
      const store = getStore();
      const currency = getCurrency();
      /*
       * Add key to object only if it'll have a value
       * We don't want to send 'Authorization: undefined' in Network requests - so the key *needs* to be absent
       */
      return [
        ...(customerToken ? ['Authorization'] : []),
        ...(store ? ['store'] : []),
        ...(currency ? ['Content-Currency'] : []),
      ];
    },
    getOwnPropertyDescriptor(target, key) {
      return {
        value: this.get(target, key, null),
        enumerable: true,
        configurable: true,
      };
    },
  };

  return new Proxy({}, proxyHandler);
};

type GraphQlClients = Record<'query' | 'mutation', GraphQLClient>;

const plugin : Plugin = (ctx, inject) => {
  const graphqlEndpoint = process.env.VSF_MAGENTO_GRAPHQL_URL;

  const headers = getHeaderProxy(ctx);

  const graphqlClients : GraphQlClients = {
    query: new GraphQLClient(graphqlEndpoint, { method: 'GET', headers }),
    mutation: new GraphQLClient(graphqlEndpoint, { method: 'POST', headers }),
  };

  inject('graphql', graphqlClients);
};

export default plugin;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $graphql: GraphQlClients;
  }

  interface Context {
    $graphql: GraphQlClients;
  }
}
