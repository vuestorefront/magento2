import { Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link customerCart} method.
 */
export type CustomerCartQuery = { customerCart: Query['customerCart'] };

/**
 * customerCart response type
 */
export type CustomerCartResponse<T extends DeepPartial<CustomerCartQuery> = CustomerCartQuery> = ApolloQueryResult<T>;

/**
 * Method to fetch customer cart
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/customerCart | customerCart } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/customerCart | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CustomerCartResponse | CustomerCartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch customer cart
 * const { data } = await sdk.magento.customerCart();
 *
 * // data contains cart details
 * const email = data?.customerCart?.email;
 *
 * ```
 *
 * @example
 * Creating a custom GraphQL query for customerCart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'customer-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query customerCart {
 *                customerCart {
 *                  ${metadata.fields}
 *                }
 *              }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to reduce the amount of fields returned by the query, when compared to the default query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   customerCart: 'customer-cart-custom-query',
 *   metadata: {
 *     fields: 'id email items { id sku }
 *   }
 * };
 *
 * const result = await sdk.magento.customerCart({ customQuery });
 *
 * // result contains cart details with only the fields specified in the custom query
 * ```
 */
export async function customerCart<RES extends CustomerCartResponse>(
  options?: MethodOptions<CustomQuery<'customerCart'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('customerCart')
    .setMethod('POST')
    .setProps([options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
