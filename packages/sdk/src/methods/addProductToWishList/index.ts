import { client } from '../../../src/client';
import { AddProductsToWishlistMutation, AddProductsToWishlistMutationVariables } from '@vsf-enterprise/magento-api-types';
import { CustomQuery, MethodOptions } from 'src/types';
import type { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * addProductToWishList response type
 */
export type AddProductToWishListResponse<T extends DeepPartial<AddProductsToWishlistMutation> = AddProductsToWishlistMutation> = ApolloQueryResult<T>

/**
 * Method to add products to wishlist
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.addProductToWishList | addProductToWishList} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#addProductToWishListQuery | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#AddProductToWishListResponse}.
 *
 * @example
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const wishlist = await sdk.magento.addProductToWishList({
 *   // Wishlist ID
 *   id: '258',
 *   // Products to add to wishlist with given ID
 *   items: [{quantity: 1, sku: 'WSH12'}]
 * });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for searching categories
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'add-product-to-wishlist-custom-query': ({ variables, metadata }) => ({
 *           variables,
 *           query: `
 *             mutation addProductsToWishlist($id: ID!, $items: [WishlistItemInput!]!) {
 *               addProductsToWishlist(wishlistId: $id, wishlistItems: $items) {
 *                 wishlist {
 *                   ${metadata.fields}
 *                 }
 *               }
 *             }`
 *         }),
 *       },
 *     }
 *   }
 * }
 * ```
 *
 * @example
 * Using a custom GraphQL query (mutation) to add products to wishlist
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *    addProductsToWishList: 'add-product-to-wishlist-custom-query',
 *    metadata: {
 *      fields: 'id items_count'
 *    }
 * };
 *
 * const result = await sdk.magento.addProductToWishList({
 *  id: '258',
 *  items: [{ quantity: 1, sku: '258'}]
 * }, { customQuery });
 *
 * // Returned wishlist will contain only the fields specified in the custom query.
 * ```
 */
export async function addProductToWishList<Res extends AddProductToWishListResponse>(
  params: AddProductsToWishlistMutationVariables,
  options?: MethodOptions<CustomQuery<'addProductsToWishlist'>>
) {
  const { data } = await client.post<Res>(
    'addProductToWishList',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
