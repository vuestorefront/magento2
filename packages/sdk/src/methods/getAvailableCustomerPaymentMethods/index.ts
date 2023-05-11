import { MethodBaseOptions } from '../../types';
import { CustomerAvailablePaymentMethodsQuery } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * getAvailableCustomerPaymentMethods response type
 */
export type GetAvailableCustomerPaymentMethodsResponse<T extends DeepPartial<CustomerAvailablePaymentMethodsQuery> = CustomerAvailablePaymentMethodsQuery> = ApolloQueryResult<T>

/**
 * Method to fetch available payment methods for a logged in customer.
 *
 * @remarks
 * This method communicates with the
 * {@link @vue-storefront/magento-api#ApiMethods.getAvailableCustomerPaymentMethods | getAvailableCustomerPaymentMethods } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vue-storefront/magento-api#getAvailableCustomerPaymentMethods | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#GetAvailableCustomerPaymentMethodsResponse | GetAvailableCustomerPaymentMethodsResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch available payment methods for a logged in customer
 * const result = await sdk.magento.getAvailableCustomerPaymentMethods();
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
export async function getAvailableCustomerPaymentMethods<RES extends GetAvailableCustomerPaymentMethodsResponse>(options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'getAvailableCustomerPaymentMethods',
    [options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
