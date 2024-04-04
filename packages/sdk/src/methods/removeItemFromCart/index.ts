import { Mutation, RemoveItemFromCartInput } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link removeItemFromCart} method.
 */
export type RemoveItemFromCartMutation = { removeItemFromCart: Mutation['removeItemFromCart'] };

/**
 * removeItemFromCart response type
 */
export type RemoveItemFromCartResponse<T extends DeepPartial<RemoveItemFromCartMutation> = RemoveItemFromCartMutation> =
  FetchResult<T>;

/**
 * Method to remove item from cart.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/removeItemFromCart | removeItemFromCart } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/removeItemFromCart | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/RemoveItemFromCartResponse | RemoveItemFromCartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Assumes that the cart has an item with the UID 'MY='.
 * // Configure method parameters
 * const params = { cart_id: TEST_CART_ID, cart_item_uid: 'MY=' }
 *
 * const result = await sdk.magento.removeItemFromCart(params);
 *
 * // result will contain the updated cart.
 * // you can look at the cart items to see that the item with the UID 'MY=' has been removed.
 * const hasItem = result.data?.removeItemFromCart!.cart!.items!.find(item => item!.uid === 'MY=');
 * ```
 *
 * @example
 * Creating a custom GraphQL query for manipulating the cart response data.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'remove-item-from-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation removeItemFromCart($input: RemoveItemFromCartInput) {
 *                removeItemFromCart(input: $input) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }`
 *          }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * // this will reduce the amount of data transferred from the server to the client.
 *
 * // All we need is the cart ID and the email address of the customer.
 * const customQuery = {
 *   cart: 'remove-item-from-cart-custom-query',
 *   metadata: {
 *     fields: 'id email'
 *   }
 * };
 *
 * // Assumes that the cart has an item with the UID 'MY='.
 * // Uses params from the previous example and the custom query.
 * const result = await sdk.magento.removeItemFromCart(params, { customQuery });
 *
 * // result will contain only the fields specified in the custom query.
 * ```
 */
export async function removeItemFromCart<RES extends RemoveItemFromCartResponse>(
  params: RemoveItemFromCartInput,
  options?: MethodOptions<CustomQuery<'removeItemFromCart'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('removeItemFromCart')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
