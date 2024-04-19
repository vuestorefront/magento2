import { FetchResult, gql } from "@apollo/client/core";
import { CustomQuery, AddProductsToWishlistMutation, AddProductsToWishlistMutationVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import addProductsToWishListQuery from "./addProductsToWishlist";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Add products to wishlist
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
 * }, customQuery);
 *
 * // Returned wishlist will contain only the fields specified in the custom query.
 * ```
 */
export async function addProductToWishList(
  context: Context,
  input: AddProductsToWishlistMutationVariables,
  customQuery: CustomQuery = { addProductsToWishlist: "addProductsToWishlist" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddProductsToWishlistMutation>> {
  const { addProductsToWishlist: addProductsToWishlistGQL } = context.extendQuery(customQuery, {
    addProductsToWishlist: {
      query: addProductsToWishListQuery,
      variables: { ...input },
    },
  });
  return context.client.mutate<AddProductsToWishlistMutation, AddProductsToWishlistMutationVariables>({
    mutation: gql`
      ${addProductsToWishlistGQL.query}
    `,
    variables: addProductsToWishlistGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
