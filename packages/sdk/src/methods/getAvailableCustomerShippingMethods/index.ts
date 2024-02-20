import { Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link getAvailableCustomerShippingMethods} method.
 */
export type CustomerAvailableShippingMethodsQuery = { customerCart: Query['customerCart'] };

/**
 * getAvailableCustomerShippingMethods response type
 */
export type GetAvailableCustomerShippingMethodsResponse<
  T extends DeepPartial<CustomerAvailableShippingMethodsQuery> = CustomerAvailableShippingMethodsQuery,
> = ApolloQueryResult<T>;

/**
 * Method to fetch available shipping methods for current customer.
 * Customer must be logged in.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailableCustomerShippingMethods | getAvailableCustomerShippingMethods } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailableCustomerShippingMethods | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/GetAvailableCustomerShippingMethodsResponse | GetAvailableCustomerShippingMethodsResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch available shipping methods for current customer
 * const result = await sdk.magento.getAvailableCustomerShippingMethods();
 * // e.g. output:
 * // {
 * //   "data": {
 * //     "customerCart": {
 * //       "shipping_addresses": [
 * //         address1: {
 * //          "available_shipping_methods": [...]
 * //         },
 * //       ]
 * //     }
 * ```
 *
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'get-available-customer-shipping-methods-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query CustomerAvailableShippingMethods {
 *                customerCart {
 *                  ${metadata?.fields}
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
 * Using a custom GraphQL query to reduce the amount of data returned by the API
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 *
 * const customQuery = {
 *  getAvailableCustomerShippingMethods: 'get-available-customer-shipping-methods-custom-query',
 *  metadata: {
 *    fields: 'shipping_addresses { available_shipping_methods { available method_title } }'
 *  }
 * };
 *
 * const result = await sdk.magento.getAvailableCustomerShippingMethods({ customQuery });
 *
 * // the result will contain only the data defined in the custom query
 * ```
 */
export async function getAvailableCustomerShippingMethods<RES extends GetAvailableCustomerShippingMethodsResponse>(
  options?: MethodOptions<CustomQuery<'getAvailableCustomerShippingMethods'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('getAvailableCustomerShippingMethods')
    .setMethod('POST')
    .setProps([options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
