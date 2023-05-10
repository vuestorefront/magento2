import { CustomQuery, MethodOptions } from '../../types';
import { SetBillingAddressOnCartInput, SetBillingAddressOnCartMutation } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * Set billing address response type
 */
export type SetBillingAddressOnCartResponse<T extends DeepPartial<SetBillingAddressOnCartMutation> = SetBillingAddressOnCartMutation> = FetchResult<T>

/**
 * Method to set billing address on the cart
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-storefront/magento-api#ApiMethods.setBillingAddressOnCart | setBillingAddressOnCart } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#setBillingAddressOnCart | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#SetBillingAddressOnCartResponse | SetBillingAddressOnCartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Prepare parameters
 * const params = {
 *   cart_id: 'some-cart-id',
 *   billing_address: {
 *       address: {
 *        firstname: 'John',
 *        lastname: 'Doe',
 *        city: 'New York',
 *        country_code: 'US',
 *        street: ['Street 1', 'Street 2'],
 *        telephone: '123 123 123',
 *        region: 'AL',
 *        postcode: '10001',
 *        save_in_address_book: false
 *       },
 *     }
 * };
 *
 * // Set shipping address on the cart
 * await sdk.magento.setBillingAddressOnCart(params);
 * ```

 * @example
 * Creating a custom GraphQL query for reducing the amount of fields returned by the query, when compared to the default query.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'set-billing-address-on-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation setBillingAddressOnCart($input: SetBillingAddressOnCartInput) {
 *                setBillingAddressOnCart(input: $input) {
 *                cart {
 *                  ${metadata.fields}
 *                }
 *              }
 *            }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   setBillingAddressOnCart: 'set-billing-address-on-cart-custom-query',
 *   metadata: {
 *     fields: 'billing_address { city }'
 *   }
 * };
 *
 * // data will contain only the fields specified in the custom query.
 * const { data } = await sdk.magento.setBillingAddressOnCart(params, { customQuery });
 * ```
 */
export async function setBillingAddressOnCart<RES extends SetBillingAddressOnCartResponse>(params: SetBillingAddressOnCartInput, options?: MethodOptions<CustomQuery<'setBillingAddressOnCart'>>) {
  const { data } = await client.post<RES>(
    'setBillingAddressOnCart',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
