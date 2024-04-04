import { GuestAvailableShippingMethodsQueryVariables, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link getAvailableShippingMethods} method.
 */
export type GuestAvailableShippingMethodsQuery = { cart: Query['cart'] };

/**
 * getAvailableShippingMethods response type
 */
export type GetAvailableShippingMethodsResponse<
  T extends DeepPartial<GuestAvailableShippingMethodsQuery> = GuestAvailableShippingMethodsQuery,
> = ApolloQueryResult<T>;

/**
 * Method to fetch guest's available shipping methods
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailableShippingMethods | getAvailableShippingMethods } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailableShippingMethods | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/GetAvailableShippingMethodsResponse | GetAvailableShippingMethodsResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch guest's available shipping methods
 * const result = await sdk.magento.getAvailableShippingMethods({
 *   cart_id: TEST_CART_ID
 * });
 * // array of available shipping methods for selected shipping address:
 * result.data.cart.shipping_addresses[0].available_shipping_methods[0];
 * ```
 *
 * @example
 * Creating a custom GraphQL query for fetching only what's requested from shipping methods
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'get-available-shipping-methods-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query GuestAvailableShippingMethods($cart_id: String!) {
 *                cart(cart_id:$cart_id) {
 *                  shipping_addresses {
 *                    available_shipping_methods {
 *                      ${metadata.fields}
 *                    }
 *                  }
 *                }
 *              }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to fetch only method_title field
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   shippingMethods: 'get-available-shipping-methods-custom-query',
 *   metadata: {
 *     fields: 'method_title'
 *   }
 * };
 *
 * const result = await sdk.magento.getAvailableShippingMethods({ cart_id: '123'}, { customQuery });
 *
 * // result contains the customer addresses with only the city method_title. Of course, it has same shape as in the "simple usage" example.
 * ```
 */
export async function getAvailableShippingMethods<RES extends GetAvailableShippingMethodsResponse>(
  params: GuestAvailableShippingMethodsQueryVariables,
  options?: MethodOptions<CustomQuery<'shippingMethods'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('getAvailableShippingMethods')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
