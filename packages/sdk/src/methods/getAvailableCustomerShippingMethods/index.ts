import { CustomQuery, MethodOptions } from '../../types';
import { CustomerAvailableShippingMethodsQuery } from '@vue-storefront/magento-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * getAvailableCustomerShippingMethods response type
 */
export type GetAvailableCustomerShippingMethodsResponse<T extends DeepPartial<CustomerAvailableShippingMethodsQuery> = CustomerAvailableShippingMethodsQuery> = ApolloQueryResult<T>

/**
 * Method to fetch available shipping methods for current customer.
 * Customer must be logged in.
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.getAvailableCustomerShippingMethods | getAvailableCustomerShippingMethods } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#getAvailableCustomerShippingMethods | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#GetAvailableCustomerShippingMethodsResponse | GetAvailableCustomerShippingMethodsResponse}.
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
export async function getAvailableCustomerShippingMethods<RES extends GetAvailableCustomerShippingMethodsResponse>(options?: MethodOptions<CustomQuery<'getAvailableCustomerShippingMethods'>>) {
  const { data } = await client.post<RES>(
    'getAvailableCustomerShippingMethods',
    [options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
