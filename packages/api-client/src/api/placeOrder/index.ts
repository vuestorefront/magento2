import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { PlaceOrderInput, PlaceOrderMutation, PlaceOrderMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import placeOrderMutation from "./placeOrder";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Place an order.
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
export async function placeOrder(
  context: Context,
  input: PlaceOrderInput,
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<PlaceOrderMutation>> {
  try {
    return await context.client.mutate<PlaceOrderMutation, PlaceOrderMutationVariables>({
      mutation: gql`
        ${placeOrderMutation}
      `,
      variables: { input },
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
