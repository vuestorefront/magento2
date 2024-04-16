import { FetchResult } from "@apollo/client/core";
import gql from "graphql-tag";
import { CustomQuery, AddProductsToCartInput, AddProductsToCartMutation, CustomHeaders } from "@vue-storefront/magento-types";
import { Context } from "../../types/context";
import addProductsToCartMutation from "./addProductsToCart";
import getHeaders from "../getHeaders";

/**
 * Add products to cart.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // add products to cart with default parameters (returns cart)
 * const cart = await sdk.magento.addProductsToCart(
 *   {
 *     cartId: '123',
 *     cartItems: [
 *       {
 *         sku: 'WSH12',
 *         quantity: 1,
 *         selected_options: [
 *           // option IDs retrieved from product
 *           'Y29uZmlndXJhYmxlLzkzLzUz',
 *           'Y29uZmlndXJhYmxlLzE0NC8xNzE='
 *         ]
 *       }
 *     ]
 *   }
 * );
 * ```
 *
 * @example
 * Creating a custom GraphQL query for adding products to cart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'add-products-to-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation addProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
 *                addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }`
 *
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to modify response containing the cart, which is sent as part of the adding product to cart mutation
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   cart: 'add-products-to-cart-custom-query',
 *   metadata: {
 *     fields: 'id items { uid }'
 *   }
 * };
 *
 *
 * const cart = await sdk.magento.addProductsToCart(
 *   {
 *     cartId: '123',
 *     cartItems: [
 *       {
 *         sku: 'WSH12',
 *         quantity: 1,
 *         selected_options: [
 *           'Y29uZmlndXJhYmxlLzkzLzUz',
 *           'Y29uZmlndXJhYmxlLzE0NC8xNzE='
 *         ]
 *       }
 *     ]
 *   },
 *   customQuery
 * );
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
export async function addProductsToCart(
  context: Context,
  input: AddProductsToCartInput,
  customQuery: CustomQuery = { addProductsToCart: "addProductsToCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddProductsToCartMutation>> {
  const { addProductsToCart: addProductsToCartGQL } = context.extendQuery(customQuery, {
    addProductsToCart: {
      query: addProductsToCartMutation,
      variables: { ...input },
    },
  });
  return context.client.mutate<AddProductsToCartMutation, AddProductsToCartInput>({
    mutation: gql`
      ${addProductsToCartGQL.query}
    `,
    variables: addProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
