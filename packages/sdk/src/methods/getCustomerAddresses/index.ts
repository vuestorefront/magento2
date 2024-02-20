import { Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link getCustomerAddresses} method.
 */
export type GetCustomerAddressesQuery = { customer: Query['customer'] };

/**
 * getCustomerAddresses response type
 */
export type GetCustomerAddressesResponse<T extends DeepPartial<GetCustomerAddressesQuery> = GetCustomerAddressesQuery> =
  ApolloQueryResult<T>;

/**
 * Method to get customer addresses.
 * Customer must be logged in before calling this method.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getCustomerAddresses | getCustomerAddresses } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getCustomerAddresses | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/GetCustomerAddressesResponse | GetCustomerAddressesResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch customer addresses if customer is logged in
 * const { data } = await sdk.magento.getCustomerAddresses();
 *
 * // data contains the customer addresses
 * data.customer.addresses; // array of customer addresses
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
 *         'get-customer-addresses-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query getCustomerAddresses {
 *                customer {
 *                  addresses {
 *                    ${metadata.fields}
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
 * Using a custom GraphQL query to reduce the amount of data returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   getCustomerAddresses: 'get-customer-addresses-custom-query',
 *   metadata: {
 *     fields: 'city'
 *   }
 * };
 *
 * const { data } = await sdk.magento.getCustomerAddresses({ customQuery });
 *
 * // data contains the customer addresses with only the city field
 * ```
 */
export async function getCustomerAddresses<RES extends GetCustomerAddressesResponse>(
  options?: MethodOptions<CustomQuery<'getCustomerAddresses'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('getCustomerAddresses')
    .setMethod('POST')
    .setProps([options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
