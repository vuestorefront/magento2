import { CustomQuery, MethodOptions } from '../../types';
import { CartQuery, CartQueryVariables } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * Category list response type
 */
export type CartResponse<T extends DeepPartial<CartQuery> = CartQuery> = ApolloQueryResult<T>

/**
 * Method to get cart
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.cart | cart} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#cart | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#CartResponse | CartResponse}.
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
export async function cart<RES extends CartResponse>(params: CartQueryVariables, options?: MethodOptions<CustomQuery<'cart'>>) {
  const { data } = await client.post<RES>(
    'cart',
    [params.cartId, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
