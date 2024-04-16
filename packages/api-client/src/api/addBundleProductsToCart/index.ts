import { FetchResult } from "@apollo/client/core";
import { CustomQuery } from "@vue-storefront/magento-types";
import type {
  AddBundleProductsToCartInput,
  AddBundleProductsToCartMutation,
  AddBundleProductsToCartMutationVariables,
  CustomHeaders,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import addBundleProductsToCartQuery from "./addBundleProductsToCart";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Add bundle products to cart.
 *
 * @example
 * Adding bundle products to cart with default parameters.
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const cart = await sdk.magento.addBundleProductsToCart(
 *   {
 *     cart_id: '123',
 *     cart_items: [
 *      {
 *        data: {
 *          quantity: 1,
 *          sku: TEST_BUNDLE_SKU,
 *        },
 *        bundle_options: [
 *          {
 *            id: 1,
 *            quantity: 1,
 *            value: ['1'],
 *          },
 *          {
 *            id: 2,
 *            quantity: 1,
 *            value: ['4'],
 *          },
 *          {
 *            id: 3,
 *            quantity: 1,
 *            value: ['5'],
 *          },
 *          {
 *            id: 4,
 *            quantity: 1,
 *            value: ['8'],
 *          },
 *     ]
 *   }
 * );
 * ```
 *
 * @example
 * Creating a custom GraphQL query for adding bundle products to cart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'add-bundle-products-to-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation addBundleProductsToCart($input: AddBundleProductsToCartInput) {
 *                addBundleProductsToCart(input: $input) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }`,
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
 *   cart: 'add-bundle-products-to-cart-custom-query',
 *   metadata: {
 *     fields: 'id items { uid }'
 *   }
 * };
 *
 *
 * const cart = await sdk.magento.addBundleProductsToCart(
 *   {
 *    // use the payload from the previous example
 *   },
 *   customQuery
 * );
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
export async function addBundleProductsToCart(
  context: Context,
  input: AddBundleProductsToCartInput,
  customQuery: CustomQuery = { addBundleProductsToCart: "addBundleProductsToCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddBundleProductsToCartMutation>> {
  const { addBundleProductsToCart: addBundleProductsToCartGQL } = context.extendQuery(customQuery, {
    addBundleProductsToCart: {
      query: addBundleProductsToCartQuery,
      variables: { input },
    },
  });

  return context.client.mutate<any, AddBundleProductsToCartMutationVariables>({
    mutation: gql`
      ${addBundleProductsToCartGQL.query}
    `,
    variables: addBundleProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
