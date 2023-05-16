import { QueryRouteArgs, RoutableInterface, RouteQuery } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { MethodBaseOptions } from '../../types';

/**
 * route response type
 */
export type RouteResponse<T extends DeepPartial<RouteQuery<RoutableInterface>> = RouteQuery<RoutableInterface>> = ApolloQueryResult<T>

/**
 * Method to resolve a route object data
 *
 * @remarks
 * This method communicates with the
 * {@link @vue-storefront/magento-api#ApiMethods.route | route } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vue-storefront/magento-api#route | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#RouteResponse | RouteResponse}.
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
 */
export async function route<RES extends RouteResponse>(params: QueryRouteArgs, options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'route',
    [params.url, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
