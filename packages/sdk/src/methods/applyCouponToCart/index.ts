import { ApplyCouponToCartInput, Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { CustomQuery, MethodOptions } from '../../types';
import { client } from '../../client';

/**
 * mutation type for the {@link applyCouponToCart} method.
 */
export type ApplyCouponToCartMutation = { applyCouponToCart: Mutation['applyCouponToCart'] };

/**
 * Apply coupon to cart response type
 */
export type ApplyCouponToCartResponse<T extends DeepPartial<ApplyCouponToCartMutation> = ApplyCouponToCartMutation> =
  FetchResult<T>;

/**
 * Method to apply coupon to cart
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/applyCouponToCart | applyCouponToCart} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/applyCouponToCart | here}.
 *
 * @param params -
 * Parameter object which can be used with this method.
 * Refer to its type definition to learn about possible properties.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/ApplyCouponToCartResponse | ApplyCouponToCartResponse}.
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
 *  const result = await sdk.magento.applyCouponToCart(params, { customQuery });
 * ```
 */
export async function applyCouponToCart<RES extends ApplyCouponToCartResponse>(
  params: ApplyCouponToCartInput,
  options?: MethodOptions<CustomQuery<'applyCouponToCart'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('applyCouponToCart')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
