import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders, CustomQuery } from "@vue-storefront/magento-types";
import { RemoveItemFromCartInput, RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import type { Context } from "../../types/context";
import removeItemFromCartMutation from "./removeItemFromCart";
import getHeaders from "../getHeaders";

/**
 * Removes an item from the given cart
 * @param context VSF context
 * @param input ID of the cart and item to be removed from it
 * @param customQuery custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
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
