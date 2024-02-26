import { Mutation, RemoveCouponFromCartInput } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { CustomQuery, MethodOptions } from '../../types';
import { client } from '../../client';

/**
 * mutation type for the {@link removeCouponFromCart} method.
 */
export type RemoveCouponFromCartMutation = { removeCouponFromCart: Mutation['removeCouponFromCart'] };

/**
 * Category list response type
 */
export type RemoveCouponFromCartResponse<
  T extends DeepPartial<RemoveCouponFromCartMutation> = RemoveCouponFromCartMutation,
> = FetchResult<T>;

/**
 * Method to remove coupon from cart
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/removeCouponFromCart | removeCouponFromCart} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/removeCouponFromCart | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/RemoveCouponFromCartResponse | RemoveCouponFromCartResponse}.
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
 *  const result = await sdk.magento.removeCouponFromCart(params, { customQuery });
 * ```
 */
export async function removeCouponFromCart<RES extends RemoveCouponFromCartResponse>(
  params: RemoveCouponFromCartInput,
  options?: MethodOptions<CustomQuery<'removeCouponFromCart'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('removeCouponFromCart')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
