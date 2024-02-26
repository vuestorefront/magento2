import { Mutation, UpdateCartItemsInput } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link updateCartItems} method.
 */
export type UpdateCartItemsMutation = { updateCartItems: Mutation['updateCartItems'] };

/**
 * updateCartItems response type
 */
export type UpdateCartItemsResponse<T extends DeepPartial<UpdateCartItemsMutation> = UpdateCartItemsMutation> =
  FetchResult<T>;

/**
 * Method to update items in the cart
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/updateCartItems | updateCartItems } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/updateCartItems | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/UpdateCartItemsResponse | UpdateCartItemsResponse}.
 *
 * @example
 * Simple usage, updating the quantity of a cart item:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // update the quantity of a cart item
 * const result = await sdk.magento.updateCartItems({
 *  cart_id: 'some-cart-id'
 *  cart_items: [{
 *      cart_item_uid: 'MY=',
 *      quantity: 10 // update the quantity to 10
 *     }]
 * });
 *
 * // result will contain the updated cart.
 * ```
 *
 * @example
 * Creating a custom GraphQL query for manipulating the cart response data.
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'update-cart-items-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation updateCartItems($input: UpdateCartItemsInput) {
 *                updateCartItems(input: $input) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                 }
 *              }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example.
 * Note that the custom query must be passed to the `customQuery` property of the `options` parameter.
 * The `metadata` property of the `options` parameter can be used to pass additional data to the custom query.
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   updateCartItems: 'update-cart-items-custom-query',
 *   metadata: {
 *     fields: 'id items { uid quantity product { uid sku }}'
 *   }
 * };
 *
 * // update the quantity of a cart item with params and custom query
 * // Params are the same as in the previous example.
 * const result = await sdk.magento.updateCartItems(params, { customQuery });
 * ```
 */
export async function updateCartItems<RES extends UpdateCartItemsResponse>(
  params: UpdateCartItemsInput,
  options?: MethodOptions<CustomQuery<'updateCartItems'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('updateCartItems')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
