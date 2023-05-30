import { CustomQuery, MethodOptions } from '../../types';
import { AddProductsToCartMutationVariables, Mutation } from '@vue-storefront/magento-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * mutation type for the {@link addProductsToCart} method.
 */
export type AddProductsToCartMutation = { addProductsToCart: Mutation['addProductsToCart'] };

/**
 * Add products to cart response type
 */
export type AddProductsToCartResponse<T extends DeepPartial<AddProductsToCartMutation> = AddProductsToCartMutation> = ApolloQueryResult<T>

/**
 * Method to add products to cart (returns cart)
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.addProductsToCart | addProductsToCart} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#addProductsToCart | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#AddProductsToCartResponse | AddProductsToCartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // add products to cart with default parameters (returns cart)
 * const cart = await sdk.magento.addProductsToCart(
 *   {
 *     cartId: '123',
 *     cartItems: [
 *       {
 *         sku: 'WSH12',
 *         quantity: 1,
 *         selected_options: [
 *           // option IDs retrieved from product
 *           'Y29uZmlndXJhYmxlLzkzLzUz',
 *           'Y29uZmlndXJhYmxlLzE0NC8xNzE='
 *         ]
 *       }
 *     ]
 *   }
 * );
 * ```
 *
 * @example
 * Creating a custom GraphQL query for adding products to cart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'add-products-to-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation addProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
 *                addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }`
 *
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to modify response containing the cart, which is sent as part of the adding product to cart mutation
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   cart: 'add-products-to-cart-custom-query',
 *   metadata: {
 *     fields: 'id items { uid }'
 *   }
 * };
 *
 *
 * const cart = await sdk.magento.addProductsToCart(
 *   {
 *     cartId: '123',
 *     cartItems: [
 *       {
 *         sku: 'WSH12',
 *         quantity: 1,
 *         selected_options: [
 *           'Y29uZmlndXJhYmxlLzkzLzUz',
 *           'Y29uZmlndXJhYmxlLzE0NC8xNzE='
 *         ]
 *       }
 *     ]
 *   },
 *   { customQuery }
 * );
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
export async function addProductsToCart<RES extends AddProductsToCartResponse>(params: AddProductsToCartMutationVariables, options?: MethodOptions<CustomQuery<'addProductsToCart'>>) {
  const { data } = await client.post<RES>(
    'addProductsToCart',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
