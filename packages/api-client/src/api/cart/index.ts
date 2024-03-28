import { ApolloQueryResult, gql } from "@apollo/client/core";
import { CustomQuery } from "@vue-storefront/magento-types";
import type { CartQuery, CartQueryVariables, CustomHeaders } from "@vue-storefront/magento-types";
import { Context } from "../../types/context";
import cartQuery from "./cart";
import getHeaders from "../getHeaders";

/**
 * Fetches a cart by its ID
 * @param context VSF context
 * @param cartId ID of the cart to fetch
 * @param customQuery custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export async function cart(
  context: Context,
  cartId: string,
  customQuery: CustomQuery = { cart: "cart" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CartQuery>> {
  const { cart: cartGQL } = context.extendQuery(customQuery, {
    cart: {
      query: cartQuery,
      variables: { cartId: cartId ?? "" },
    },
  });
  return context.client.query<CartQuery, CartQueryVariables>({
    query: gql`
      ${cartGQL.query}
    `,
    variables: cartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
