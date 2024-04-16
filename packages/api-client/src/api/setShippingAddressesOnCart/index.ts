import type { FetchResult } from "@apollo/client/core";
import type {
  CustomHeaders,
  CustomQuery,
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutation,
  SetShippingAddressesOnCartMutationVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import setShippingAddressesOnCartQuery from "./setShippingAddressesOnCart";
import type { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Set shipping addresses on the cart
 * It should be used to set single or multiple shipping addresses on the cart.
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
 * const { data } = await sdk.magento.setShippingAddressesOnCart(params, customQuery);
 * ```
 */
export async function setShippingAddressesOnCart(
  context: Context,
  input: SetShippingAddressesOnCartInput,
  customQuery: CustomQuery = { setShippingAddressesOnCart: "setShippingAddressesOnCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<SetShippingAddressesOnCartMutation>> {
  const { setShippingAddressesOnCart: setShippingAddressesOnCartGQL } = context.extendQuery(customQuery, {
    setShippingAddressesOnCart: {
      query: setShippingAddressesOnCartQuery,
      variables: { input },
    },
  });

  return context.client.mutate<SetShippingAddressesOnCartMutation, SetShippingAddressesOnCartMutationVariables>({
    mutation: gql`
      ${setShippingAddressesOnCartGQL.query}
    `,
    variables: setShippingAddressesOnCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
