import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { ApplyCouponToCartInput, ApplyCouponToCartMutation, ApplyCouponToCartMutationVariables, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import type { Context } from "../../types/context";
import applyCouponToCartMutation from "./applyCouponToCart";
import getHeaders from "../getHeaders";

/**
 * Apply coupon to cart
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // apply coupon parameters
 * const params = {
 *  cart_id: 'test-cart-id',
 *  coupon_code: 'test-coupon-code'
 * };
 *
 * // The result of the coupon application
 * const result = await sdk.magento.applyCouponToCart(params);
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
 *         'apply-coupon-to-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation applyCouponToCart($input: ApplyCouponToCartInput) {
 *                applyCouponToCart(input: $input) {
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
 *  const customQuery = {
 *    applyCouponToCart: 'apply-coupon-to-cart-custom-query',
 *      metadata: {
 *        fields: 'cart { applied_coupons { code } }'
 *      }
 *    };
 *
 *  const params = {
 *    cart_id: 'test-cart-id',
 *    coupon_code: 'test-coupon-code'
 *  };
 *
 *  // The result will contain only fields configured in the custom query
 *  const result = await sdk.magento.applyCouponToCart(params, customQuery);
 * ```
 */
export async function applyCouponToCart(
  context: Context,
  input: ApplyCouponToCartInput,
  customQuery: CustomQuery = { applyCouponToCart: "applyCouponToCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<ApplyCouponToCartMutation>> {
  const { applyCouponToCart: applyCouponToCartGQL } = context.extendQuery(customQuery, {
    applyCouponToCart: {
      query: applyCouponToCartMutation,
      variables: { input },
    },
  });

  return context.client.mutate<ApplyCouponToCartMutation, ApplyCouponToCartMutationVariables>({
    mutation: gql`
      ${applyCouponToCartGQL.query}
    `,
    variables: applyCouponToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
