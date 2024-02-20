import { Mutation, SetShippingAddressesOnCartInput } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link setShippingAddressesOnCart} method.
 */
export type SetShippingAddressesOnCartMutation = { setShippingAddressesOnCart: Mutation['setShippingAddressesOnCart'] };

/**
 * Set Shipping Address response type
 */
export type SetShippingAddressesOnCartResponse<
  T extends DeepPartial<SetShippingAddressesOnCartMutation> = SetShippingAddressesOnCartMutation,
> = FetchResult<T>;

/**
 * Method to set shipping addresses on the cart
 * It should be used to set single or multiple shipping addresses on the cart.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/setShippingAddressOnCart | setShippingAddressOnCart } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/setShippingAddressOnCart | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/SetShippingAddressesOnCartResponse | SetShippingAddressesOnCartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Prepare parameters
 * const params = {
 *   cart_id: 'some-cart-id',
 *   shipping_addresses: [
 *     {
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
 *   ]
 * };
 *
 * // Set shipping address on the cart
 * await sdk.magento.setShippingAddressesOnCart(params);
 * ```
 * @example
 * You can also use the `setShippingAddressesOnCart` method to set multiple shipping addresses on the cart.
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Prepare parameters
 * const params = {
 *  cart_id: 'some-cart-id',
 *  shipping_addresses: [
 *   {
 *     address: address1, // address1 is an object with address details
 *   },
 *   {
 *     address: address2, // address2 is an object with address details
 *   }
 * ];
 *
 * // This will set address1 and address2 on the cart
 * await sdk.magento.setShippingAddressesOnCart(params);
 * ```
 *
 *
 * @example
 * Creating a custom GraphQL query for reducing the amount of fields returned by the query, when compared to the default query.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'set-shipping-addresses-on-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation setShippingAddressesOnCart($input: SetShippingAddressesOnCartInput) {
 *                setShippingAddressesOnCart(input: $input) {
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
 *   cart: 'set-shipping-addresses-on-cart-custom-query',
 *   metadata: {
 *     fields: 'shipping_addresses { city }'
 *   }
 * };
 *
 * // data will contain only the fields specified in the custom query.
 * const { data } = await sdk.magento.setShippingAddressesOnCart(params, { customQuery });
 * ```
 */
export async function setShippingAddressesOnCart<RES extends SetShippingAddressesOnCartResponse>(
  params: SetShippingAddressesOnCartInput,
  options?: MethodOptions<CustomQuery<'setShippingAddressesOnCart'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('setShippingAddressesOnCart')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
