import { MethodBaseOptions } from '../../types';
import { GuestAvailablePaymentMethodsQuery, GuestAvailablePaymentMethodsQueryVariables } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * getAvailablePaymentMethods response type
 */
export type GetAvailablePaymentMethodsResponse<T extends DeepPartial<GuestAvailablePaymentMethodsQuery> = GuestAvailablePaymentMethodsQuery> = ApolloQueryResult<T>

/**
 * Method to get available payment methods for the received guest cart.
 * To get available customer payment methods use {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#getAvailableCustomerPaymentMethods | getAvailableCustomerPaymentMethods }.
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.getAvailablePaymentMethods | getAvailablePaymentMethods } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#getAvailablePaymentMethods | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#GetAvailablePaymentMethodsResponse | GetAvailablePaymentMethodsResponse}.
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
export async function getAvailablePaymentMethods<RES extends GetAvailablePaymentMethodsResponse>(params: GuestAvailablePaymentMethodsQueryVariables, options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'getAvailablePaymentMethods',
    [params.cartId, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
