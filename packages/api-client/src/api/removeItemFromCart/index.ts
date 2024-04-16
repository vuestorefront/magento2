import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders, CustomQuery } from "@vue-storefront/magento-types";
import { RemoveItemFromCartInput, RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import type { Context } from "../../types/context";
import removeItemFromCartMutation from "./removeItemFromCart";
import getHeaders from "../getHeaders";

/**
 * Remove item from cart.
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
 * const result = await sdk.magento.removeItemFromCart(params, customQuery);
 *
 * // result will contain only the fields specified in the custom query.
 * ```
 */
export async function removeItemFromCart(
  context: Context,
  input: RemoveItemFromCartInput,
  customQuery: CustomQuery = { removeItemFromCart: "removeItemFromCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<RemoveItemFromCartMutation>> {
  const { removeItemFromCart: removeItemFromCartGQL } = context.extendQuery(customQuery, {
    removeItemFromCart: {
      query: removeItemFromCartMutation,
      variables: { input },
    },
  });

  return context.client.mutate<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>({
    mutation: gql`
      ${removeItemFromCartGQL.query}
    `,
    variables: removeItemFromCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
