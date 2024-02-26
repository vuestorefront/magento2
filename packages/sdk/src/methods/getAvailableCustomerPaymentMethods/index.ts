import { Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { MethodBaseOptions } from '../../types';

/**
 * query type for the {@link getAvailableCustomerPaymentMethods} method.
 */
export type CustomerAvailablePaymentMethodsQuery = { cart: Query['customerCart'] };

/**
 * getAvailableCustomerPaymentMethods response type
 */
export type GetAvailableCustomerPaymentMethodsResponse<
  T extends DeepPartial<CustomerAvailablePaymentMethodsQuery> = CustomerAvailablePaymentMethodsQuery,
> = ApolloQueryResult<T>;

/**
 * Method to fetch available payment methods for a logged in customer.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailableCustomerPaymentMethods | getAvailableCustomerPaymentMethods } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailableCustomerPaymentMethods | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/GetAvailableCustomerPaymentMethodsResponse | GetAvailableCustomerPaymentMethodsResponse}.
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
export async function getAvailableCustomerPaymentMethods<RES extends GetAvailableCustomerPaymentMethodsResponse>(
  options?: MethodBaseOptions,
) {
  return new AxiosRequestSender(client)
    .setUrl('getAvailableCustomerPaymentMethods')
    .setMethod('POST')
    .setProps([options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
