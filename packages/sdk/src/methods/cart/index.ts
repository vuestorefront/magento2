import { CartQueryVariables, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link cart} method.
 */
export type CartQuery = { cart: Query['cart'] };

/**
 * Category list response type
 */
export type CartResponse<T extends DeepPartial<CartQuery> = CartQuery> = ApolloQueryResult<T>;

/**
 * Method to get cart
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/cart | cart} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/cart | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CartResponse | CartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch cart with default parameters
 * const cart = await sdk.magento.cart({ cartId: '123' });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for getting cart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query cart($cartId: String!) {
 *                cart(cart_id:$cartId) {
 *                  ${metadata.fields}
 *                }
 *              }`
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to fetch cart
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   cart: 'cart-custom-query',
 *   metadata: {
 *     fields: 'id items { uid }'
 *   }
 * };
 *
 * const cart = await sdk.magento.cart({ cartId: '123'}, { customQuery });
 *
 * // Cart will contain only the fields specified in the custom query.
 * ```
 */
export async function cart<RES extends CartResponse>(
  params: CartQueryVariables,
  options?: MethodOptions<CustomQuery<'cart'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('cart')
    .setMethod('POST')
    .setProps([params.cartId, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
