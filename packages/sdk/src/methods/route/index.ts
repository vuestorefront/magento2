import { Query, QueryRouteArgs } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import type { CustomQuery, MethodOptions } from '../../types';

/**
 * route type for the {@link route} method.
 */
export type RouteQuery = { route: Query['route'] };

/**
 * route response type
 */
export type RouteResponse<T extends DeepPartial<RouteQuery> = RouteQuery> = ApolloQueryResult<T>;

/**
 * Method to resolve a route object data
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/route | route } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/route | here}.
 *
 * @param params -
 * Parameter object which can be used with this method.
 * Refer to its type definition to learn about possible properties.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/RouteResponse | RouteResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch route object data
 * const result = await sdk.magento.route({
 *   url: 'aether-gym-pant.html'
 * });
 *
 * // Example result:
 * {
 *    data: {
 *      route: { type: 'PRODUCT', sku: 'MP11', __typename: 'ConfigurableProduct' }
 *    },
 *    loading: false,
 *    networkStatus: 7
 * }
 * ```
 *  * @example
 * Creating a custom GraphQL query to fetch additional data:
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'route-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query route($url: String!) {
 *                route(url: $url) {
 *                  ${metadata?.fields}
 *                }
 *              }
 *            }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   route: 'route-custom-query',
 *   metadata: {
 *     fields: 'type ... on CategoryInterface { uid name image}' // fetch additional name and image fields
 *   }
 * };
 *
 * // data will contain only the fields specified in the custom query.
 * const { data } = await sdk.magento.route({ url: 'women.html' }, { customQuery });
 * ```
 */
export async function route<RES extends RouteResponse>(
  params: QueryRouteArgs,
  options?: MethodOptions<CustomQuery<'route'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('route')
    .setMethod('GET')
    .setProps([params.url, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
