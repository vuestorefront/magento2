import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders, CustomQuery } from "@vue-storefront/magento-types";
import { UpdateCartItemsInput, UpdateCartItemsMutation, UpdateCartItemsMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import type { Context } from "../../types/context";
import updateCartItemsMutation from "./updateCartItems";
import getHeaders from "../getHeaders";

/**
 * Update items in the cart
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
 * const result = await sdk.magento.updateCartItems(params, customQuery);
 * ```
 */
export async function updateCartItems(
  context: Context,
  input: UpdateCartItemsInput,
  customQuery: CustomQuery = { updateCartItems: "updateCartItems" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<UpdateCartItemsMutation>> {
  const { updateCartItems: updateCartItemsGQL } = context.extendQuery(customQuery, {
    updateCartItems: {
      query: updateCartItemsMutation,
      variables: { input },
    },
  });

  return context.client.mutate<UpdateCartItemsMutation, UpdateCartItemsMutationVariables>({
    mutation: gql`
      ${updateCartItemsGQL.query}
    `,
    variables: updateCartItemsGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
