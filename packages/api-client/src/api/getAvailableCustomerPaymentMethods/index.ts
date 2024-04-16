import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomerAvailablePaymentMethodsQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";
import CustomerAvailablePaymentMethods from "./CustomerPaymentMethods";

/**
 * Fetch available payment methods for a logged in customer.
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
export async function getAvailableCustomerPaymentMethods(
  context: Context,
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQuery>> {
  try {
    return await context.client.query<CustomerAvailablePaymentMethodsQuery>({
      query: gql`
        ${CustomerAvailablePaymentMethods}
      `,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
