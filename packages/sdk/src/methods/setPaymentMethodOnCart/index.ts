import { CustomQuery, MethodOptions } from '../../types';
import { SetPaymentMethodOnCartInputs, SetPaymentMethodOnCartMutation } from '@vue-storefront/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * setPaymentMethodOnCart response type
 */
export type SetPaymentMethodOnCartResponse<T extends DeepPartial<SetPaymentMethodOnCartMutation> = SetPaymentMethodOnCartMutation> = FetchResult<T>

/**
 * Method to set payment method on cart.
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.setPaymentMethodOnCart | setPaymentMethodOnCart } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#setPaymentMethodOnCart | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#SetPaymentMethodOnCartResponse | SetPaymentMethodOnCartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const params = {
 *   cart_id: 'some-cart-id'
 *   payment_method: {
 *     code: 'checkmo'
 *   }
 * };
 *
 * // sets payment method on cart and return payment information
 * // data contains properties like `available_payment_methods` and `selected_payment_method`
 * const { data } = await sdk.magento.setPaymentMethodOnCart(params);
 * ```
 *
 * @example
 * Creating a custom GraphQL query for configuring the response data structure
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'set-payment-method-on-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation setPaymentMethodOnCart($input: SetPaymentMethodOnCartInput) {
 *                setPaymentMethodOnCart(input: $input) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created with the `set-payment-method-on-cart-custom-query` in the previous example
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   setPaymentMethodOnCart: 'set-payment-method-on-cart-custom-query',
 *   metadata: {
 *     fields: 'available_payment_methods { code title }'
 *   }
 * };
 *
 * // Params and options are the same as in the previous example
 * const { data } = await sdk.magento.setPaymentMethodOnCart(params, { customQuery });
 *
 * // data contains only the properties selected in the custom query
 * ```
 */
export async function setPaymentMethodOnCart<RES extends SetPaymentMethodOnCartResponse>(params: SetPaymentMethodOnCartInputs, options?: MethodOptions<CustomQuery<'setPaymentMethodOnCart'>>) {
  const { data } = await client.post<RES>(
    'setPaymentMethodOnCart',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
