import type { AddBundleProductsToCartInput, Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link addBundleProductsToCart} method.
 */
export type AddBundleProductsToCart = {
  addBundleProductsToCart: Mutation['addBundleProductsToCart'];
};

/**
 * Add bundle products to cart response type
 */
export type AddBundleProductsToCartResponse<T extends DeepPartial<AddBundleProductsToCart> = AddBundleProductsToCart> =
  ApolloQueryResult<T>;

/**
 * Method to add bundle products to cart (returns cart)
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/addBundleProductsToCart | addBundleProductsToCart} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/addBundleProductsToCart | here}.
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
 * Adding bundle products to cart with default parameters.
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const cart = await sdk.magento.addBundleProductsToCart(
 *   {
 *     cart_id: '123',
 *     cart_items: [
 *      {
 *        data: {
 *          quantity: 1,
 *          sku: TEST_BUNDLE_SKU,
 *        },
 *        bundle_options: [
 *          {
 *            id: 1,
 *            quantity: 1,
 *            value: ['1'],
 *          },
 *          {
 *            id: 2,
 *            quantity: 1,
 *            value: ['4'],
 *          },
 *          {
 *            id: 3,
 *            quantity: 1,
 *            value: ['5'],
 *          },
 *          {
 *            id: 4,
 *            quantity: 1,
 *            value: ['8'],
 *          },
 *     ]
 *   }
 * );
 * ```
 *
 * @example
 * Creating a custom GraphQL query for adding bundle products to cart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'add-bundle-products-to-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation addBundleProductsToCart($input: AddBundleProductsToCartInput) {
 *                addBundleProductsToCart(input: $input) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }`,
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
 *   cart: 'add-bundle-products-to-cart-custom-query',
 *   metadata: {
 *     fields: 'id items { uid }'
 *   }
 * };
 *
 *
 * const cart = await sdk.magento.addBundleProductsToCart(
 *   {
 *    // use the payload from the previous example
 *   }, { customQuery }
 * );
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
export async function addBundleProductsToCart<RES extends AddBundleProductsToCartResponse>(
  params: AddBundleProductsToCartInput,
  options?: MethodOptions<CustomQuery<'addBundleProductsToCart'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('addBundleProductsToCart')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
