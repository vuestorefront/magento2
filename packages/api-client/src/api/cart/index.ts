import { ApolloQueryResult, gql } from "@apollo/client/core";
import { CustomQuery } from "@vue-storefront/magento-types";
import type { CartQuery, CartQueryVariables, CustomHeaders } from "@vue-storefront/magento-types";
import { Context } from "../../types/context";
import cartQuery from "./cart";
import getHeaders from "../getHeaders";

/**
 * Get cart
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch cart with default parameters
 * const cart = await sdk.magento.cart({ cartId: '123' });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for getting cart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query cart($cartId: String!) {
 *                cart(cart_id:$cartId) {
 *                  ${metadata.fields}
 *                }
 *              }`
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to fetch cart
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   cart: 'cart-custom-query',
 *   metadata: {
 *     fields: 'id items { uid }'
 *   }
 * };
 *
 * const cart = await sdk.magento.cart({ cartId: '123'}, customQuery);
 *
 * // Cart will contain only the fields specified in the custom query.
 * ```
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
