import { GuestAvailablePaymentMethodsQueryVariables, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { MethodBaseOptions } from '../../types';

/**
 * query type for the {@link getAvailablePaymentMethods} method.
 */
export type GuestAvailablePaymentMethodsQuery = { cart: Query['cart'] };

/**
 * getAvailablePaymentMethods response type
 */
export type GetAvailablePaymentMethodsResponse<
  T extends DeepPartial<GuestAvailablePaymentMethodsQuery> = GuestAvailablePaymentMethodsQuery,
> = ApolloQueryResult<T>;

/**
 * Method to get available payment methods for the received guest cart.
 * To get available customer payment methods use {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailableCustomerPaymentMethods | getAvailableCustomerPaymentMethods }.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailablePaymentMethods | getAvailablePaymentMethods } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailablePaymentMethods | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/GetAvailablePaymentMethodsResponse | GetAvailablePaymentMethodsResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch guest available payment methods
 * const result = await sdk.magento.getAvailablePaymentMethods({
 *  cartId: 'masked-cart-id'
 * });
 *
 * // example result
 * {
 *   "data": {
 *     "cart": {
 *       "__typename": "Cart",
 *       "available_payment_methods": [
 *         {
 *           "__typename": "AvailablePaymentMethod",
 *           "code": "checkmo",
 *           "title": "Check / Money order"
 *         }
 *       ]
 *     }
 *   },
 *   "loading": false,
 *   "networkStatus": 7
 * }
 * ```
 */
export async function getAvailablePaymentMethods<RES extends GetAvailablePaymentMethodsResponse>(
  params: GuestAvailablePaymentMethodsQueryVariables,
  options?: MethodBaseOptions,
) {
  return new AxiosRequestSender(client)
    .setUrl('getAvailablePaymentMethods')
    .setMethod('POST')
    .setProps([params.cartId, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
