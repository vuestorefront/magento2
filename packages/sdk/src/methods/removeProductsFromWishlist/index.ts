import { Mutation, RemoveProductsFromWishlistMutationVariables } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link removeProductsFromWishlist} method.
 */
export type RemoveProductsFromWishlistMutation = { removeProductsFromWishlist: Mutation['removeProductsFromWishlist'] };

/**
 * removeProductsFromWishlist response type
 */
export type RemoveProductsFromWishlistResponse<
  T extends DeepPartial<RemoveProductsFromWishlistMutation> = RemoveProductsFromWishlistMutation,
> = FetchResult<T>;

/**
 * Method to remove products from wishlist
 * Customer must be logged in to perform this operation. (token in headers)
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/removeProductsFromWishlist | removeProductsFromWishlist } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/removeProductsFromWishlist | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/RemoveProductsFromWishlistResponse | RemoveProductsFromWishlistResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // remove
 * const result = await sdk.magento.removeProductsFromWishlist({
 *  id: 'some-wishlist-id',
 *  items: ['some-product-id']
 * });
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
 *         'remove-products-from-wishlist-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation removeProductsFromWishlist($id: ID!, $items: [ID!]!) {
 *                removeProductsFromWishlist(wishlistId: $id, wishlistItemsIds: $items) {
 *                  wishlist {
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
 * Using a custom GraphQL query to reduce the amount of data returned by the API
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   removeProductsFromWishlist: 'remove-products-from-wishlist-custom-query',
 *   metadata: {
 *     fields: 'id'
 *   }
 * };
 *
 * const result = await sdk.magento.removeProductsFromWishlist({
 *  id: 'some-wishlist-id',
 *  items: ['item-id-1', 'item-id-2']
 * }, { customQuery });
 *
 * // result should be narrowed to only contain the `id` field
 * ```
 */
export async function removeProductsFromWishlist<RES extends RemoveProductsFromWishlistResponse>(
  params: RemoveProductsFromWishlistMutationVariables,
  options?: MethodOptions<CustomQuery<'removeProductsFromWishlist'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('removeProductsFromWishlist')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
