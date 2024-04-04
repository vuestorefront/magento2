import { Mutation, PlaceOrderInput } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link placeOrder} method.
 */
export type PlaceOrderMutation = { placeOrder: Mutation['placeOrder'] };

/**
 * placeOrder response type
 */
export type PlaceOrderResponse<T extends DeepPartial<PlaceOrderMutation> = PlaceOrderMutation> = FetchResult<T>;

/**
 * Method to place an order.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/placeOrder | placeOrder } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/placeOrder | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/PlaceOrderResponse | PlaceOrderResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // place an order
 * const result = await sdk.magento.placeOrder({cart_id: 'some-cart-id'});
 *
 * // example result:
 * {
 *   "data": {
 *     "placeOrder": {
 *       "__typename": "PlaceOrderOutput",
 *       "order": {
 *         "__typename": "Order",
 *         "order_number": "000000522"
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @example
 * The complete flow of placing an order for a guest user:
 *
 * ```ts
 * const emptyCart = await sdk.magento.createEmptyCart(); // create an empty cart
 * const cartId = emptyCart?.data?.createEmptyCart || ''; // get cart id from the response
 *
 * // set guest email on the cart
 * await sdk.magento.setGuestEmailOnCart({ cart_id: cartId, email: 'john.doe+test@vuestorefront.io' });
 *
 * // add products to the cart
 * await sdk.magento.addProductsToCart({
 *   cartId,
 *   cartItems: [
 *     {
 *       quantity: 1,
 *       sku: 'some-sku',
 *       // size and color
 *       selected_options: ['Y29uZmlndXJhYmxlLzkzLzUz', 'Y29uZmlndXJhYmxlLzE0NC8xNzE=']
 *     }
 *   ]
 * });
 *
 * const address = {
 *   firstname: 'John',
 *   lastname: 'Doe',
 *   city: 'New York',
 *   country_code: 'US',
 *   street: ['Street 1', 'Street 2'],
 *   telephone: '123 123 123',
 *   region: 'AL',
 *   postcode: '10001',
 *   save_in_address_book: false
 * }
 *
 * // set shipping and billing address
 * await sdk.magento.setShippingAddressesOnCart({
 *   cart_id: cartId,
 *   shipping_addresses: [{ address }]
 * });
 * await sdk.magento.setBillingAddressOnCart({
 *   cart_id: cartId,
 *   billing_address: { address }
 * });
 *
 * //
 * await sdk.magento.setShippingMethodsOnCart({
 *   cart_id: cartId,
 *   shipping_methods: [{ carrier_code: 'flatrate', method_code: 'flatrate' }]
 * });
 * await sdk.magento.setPaymentMethodOnCart({
 *   cart_id: cartId,
 *   payment_method: { code: 'checkmo' }
 * });
 *
 * // place the order
 * const result = await sdk.magento.placeOrder({ cart_id: cartId });
 */
export async function placeOrder<RES extends PlaceOrderResponse>(
  params: PlaceOrderInput,
  options?: MethodOptions<CustomQuery<'placeOrder'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('placeOrder')
    .setMethod('POST')
    .setProps([params, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
