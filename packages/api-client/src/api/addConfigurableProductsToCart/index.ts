import { FetchResult } from "@apollo/client/core";
import {
  CustomQuery,
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartMutation,
  AddConfigurableProductsToCartMutationVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import type { Context } from "../../types/context";
import addConfigurableProductsToCartMutation from "./addConfigurableProductsToCart";
import getHeaders from "../getHeaders";

/**
 * Add configurable products to cart.
 *
 * @example
 * Adding configurable products to cart with default parameters.
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const cart = await sdk.magento.addConfigurableProductsToCart(
 *   {
 *     cart_id: '123',
 *     cart_items: [
 *       {
 *        data: {
 *          quantity: 1,
 *          sku: 'MH01-XS-Black',
 *        },
 *        parent_sku: 'MH01',
 *        customizable_options: [],
 *       }
 *     ]
 *   }
 * );
 * ```
 *
 * @example
 * Creating a custom GraphQL query for adding configurable products to cart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'add-configurable-products-to-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation addConfigurableProductsToCart($input: AddConfigurableProductsToCartInput) {
 *                addConfigurableProductsToCart(input: $input) {
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
 *   cart: 'add-configurable-products-to-cart-custom-query',
 *   metadata: {
 *     fields: 'id items { uid }'
 *   }
 * };
 *
 *
 * const cart = await sdk.magento.addConfigurableProductsToCart(
 *   {
 *     cart_id: '123',
 *     cart_items: [
 *       {
 *        data: {
 *          quantity: 1,
 *          sku: 'MH01-XS-Black',
 *        },
 *        parent_sku: 'MH01',
 *        customizable_options: [],
 *       }
 *     ]
 *   },
 *   customQuery
 * );
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
export async function addConfigurableProductsToCart(
  context: Context,
  input: AddConfigurableProductsToCartInput,
  customQuery: CustomQuery = { addConfigurableProductsToCart: "addConfigurableProductsToCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddConfigurableProductsToCartMutation>> {
  const { addConfigurableProductsToCart: addConfigurableProductsToCartGQL } = context.extendQuery(customQuery, {
    addConfigurableProductsToCart: {
      query: addConfigurableProductsToCartMutation,
      variables: { input },
    },
  });
  return context.client.mutate<any, AddConfigurableProductsToCartMutationVariables>({
    mutation: gql`
      ${addConfigurableProductsToCartGQL.query}
    `,
    variables: addConfigurableProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
