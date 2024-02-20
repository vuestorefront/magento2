import { Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link customer} method.
 */
export type CustomerQuery = { customer: Query['customer'] };

/**
 * customer response type
 */
export type CustomerResponse<T extends DeepPartial<CustomerQuery> = CustomerQuery> = ApolloQueryResult<T>;

/**
 * Method to get current customer information
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/customer | customer } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/customer | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CustomerResponse | CustomerResponse}.
 *
 * @example
 * The `customer()` returns the currently active user.
 * This means that the request needs to contain an authorization token, which will tell Magento whose customer data should be fetched.
 *
 * If your browser has a VSF customer cookie saved, you can just call `customer()` without any parameters - the token will be attached automatically on every request to the middleware.
 *
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch customer
 * const customer = await sdk.magento.customer();
 * ```
 *
 * @example
 * If you're calling `customer()` in a non-browser context (for example in integration tests) where it's not possible to save a cookie,
 * you can attach the token manually using `customHeaders`
 *
 * Usage with manual authorization:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const token = '123'
 * const customHeaders = { Authorization: `Bearer {token}` }
 *
 * // fetch customer
 * const customer = await sdk.magento.customer({ customHeaders });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for fetching customer
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'customer-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query customer {
 *                customer {
 *                  ${metadata.fields}
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
 * Using a custom GraphQL query to fetch customer
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   customer: 'customer-custom-query',
 *   metadata: {
 *     fields: 'email firstname lastname'
 *   }
 * };
 *
 * const customer = await sdk.magento.customer({ customQuery });
 *
 * // customer will contain only the fields specified in the custom query.
 * ```
 */
export async function customer<RES extends CustomerResponse>(options?: MethodOptions<CustomQuery<'customer'>>) {
  return new AxiosRequestSender(client)
    .setUrl('customer')
    .setMethod('POST')
    .setProps([options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
