import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomQuery, RemoveProductsFromWishlistMutation, RemoveProductsFromWishlistMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import removeProductsFromWishlistQuery from "./removeProductsFromWishlist";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Remove products from wishlist
 * Customer must be logged in to perform this operation. (token in headers)
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
 * }, customQuery);
 *
 * // result should be narrowed to only contain the `id` field
 * ```
 */
export async function removeProductsFromWishlist(
  context: Context,
  input: RemoveProductsFromWishlistMutationVariables,
  customQuery: CustomQuery = { removeProductsFromWishlist: "removeProductsFromWishlist" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<RemoveProductsFromWishlistMutation>> {
  const { removeProductsFromWishlist: removeProductsFromWishlistGQL } = context.extendQuery(customQuery, {
    removeProductsFromWishlist: {
      query: removeProductsFromWishlistQuery,
      variables: { ...input },
    },
  });

  return context.client.mutate<RemoveProductsFromWishlistMutation, RemoveProductsFromWishlistMutationVariables>({
    mutation: gql`
      ${removeProductsFromWishlistGQL.query}
    `,
    variables: removeProductsFromWishlistGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
