import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import {
  CustomQuery,
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
  RemoveCouponFromCartMutationVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import type { Context } from "../../types/context";
import removeCouponFromCartMutation from "./removeCouponFromCart";
import getHeaders from "../getHeaders";

/**
 * Remove coupon from cart
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // assuming that the coupon code is already applied to the cart
 * const params = {
 *  cart_id: 'test-cart-id',
 * };
 *
 * // Remove coupon from cart
 * const result = await sdk.magento.removeCouponFromCart(params);
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
 *         'remove-coupon-from-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation removeCouponFromCart($input: RemoveCouponFromCartInput) {
 *                removeCouponFromCart(input: $input) {
 *                  ${metadata.fields}
 *                }
 *              }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to fetch reduced amount of data
 *
 * ```ts
 *  import { sdk } from '~/sdk.config.ts';
 *
 *  const customQuery = {
 *    removeCouponFromCart: 'remove-coupon-from-cart-custom-query',
 *      metadata: {
 *        fields: 'cart { applied_coupons { code } }'
 *      }
 *    };
 *
 *  // The only required parameter is cart_id
 *  const params = {
 *    cart_id: 'test-cart-id',
 *  };
 *
 *  // The result will contain only fields configured in the custom query
 *  const result = await sdk.magento.removeCouponFromCart(params, customQuery);
 * ```
 */
export async function removeCouponFromCart(
  context: Context,
  input: RemoveCouponFromCartInput,
  customQuery: CustomQuery = { removeCouponFromCart: "removeCouponFromCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<RemoveCouponFromCartMutation>> {
  const { removeCouponFromCart: removeCouponFromCartGQL } = context.extendQuery(customQuery, {
    removeCouponFromCart: {
      query: removeCouponFromCartMutation,
      variables: { input },
    },
  });

  return context.client.mutate<RemoveCouponFromCartMutation, RemoveCouponFromCartMutationVariables>({
    mutation: gql`
      ${removeCouponFromCartGQL.query}
    `,
    variables: removeCouponFromCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
