import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders, GuestAvailablePaymentMethodsQuery, GuestAvailablePaymentMethodsQueryVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { Context } from "../../types/context";
import GuestAvailablePaymentMethods from "./GuestAvailablePaymentMethods";
import getHeaders from "../getHeaders";

/**
 * Get available payment methods for the received guest cart.
 * To get available customer payment methods use {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/getAvailableCustomerPaymentMethods | getAvailableCustomerPaymentMethods }.
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
export async function getAvailablePaymentMethods(
  context: Context,
  cartId: string,
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery>> {
  try {
    return await context.client.query<GuestAvailablePaymentMethodsQuery, GuestAvailablePaymentMethodsQueryVariables>({
      query: gql`
        ${GuestAvailablePaymentMethods}
      `,
      variables: { cartId: cartId ?? "" },
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
