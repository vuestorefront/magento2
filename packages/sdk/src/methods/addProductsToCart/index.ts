import { AddProductsToCartMutationVariables, Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link addProductsToCart} method.
 */
export type AddProductsToCartMutation = { addProductsToCart: Mutation['addProductsToCart'] };

/**
 * Add products to cart response type
 */
export type AddProductsToCartResponse<T extends DeepPartial<AddProductsToCartMutation> = AddProductsToCartMutation> =
  ApolloQueryResult<T>;

/**
 * Method to add products to cart (returns cart)
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/addProductsToCart | addProductsToCart} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/addProductsToCart | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/AddProductsToCartResponse | AddProductsToCartResponse}.
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
export async function addProductsToCart<RES extends AddProductsToCartResponse>(
  params: AddProductsToCartMutationVariables,
  options?: MethodOptions<CustomQuery<'addProductsToCart'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('addProductsToCart')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
