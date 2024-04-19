import { ApolloQueryResult, gql } from "@apollo/client/core";
import { CustomQuery, GuestAvailableShippingMethodsQuery, GuestAvailableShippingMethodsQueryVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { Context } from "../../types/context";
import GuestAvailableShippingMethods from "./GuestAvailableShippingMethods";
import getHeaders from "../getHeaders";

/**
 * Fetch guest's available shipping methods
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch guest's available shipping methods
 * const result = await sdk.magento.getAvailableShippingMethods({
 *   cart_id: TEST_CART_ID
 * });
 * // array of available shipping methods for selected shipping address:
 * result.data.cart.shipping_addresses[0].available_shipping_methods[0];
 * ```
 *
 * @example
 * Creating a custom GraphQL query for fetching only what's requested from shipping methods
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'get-available-shipping-methods-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query GuestAvailableShippingMethods($cart_id: String!) {
 *                cart(cart_id:$cart_id) {
 *                  shipping_addresses {
 *                    available_shipping_methods {
 *                      ${metadata.fields}
 *                    }
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
 * Using a custom GraphQL query to fetch only method_title field
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   shippingMethods: 'get-available-shipping-methods-custom-query',
 *   metadata: {
 *     fields: 'method_title'
 *   }
 * };
 *
 * const result = await sdk.magento.getAvailableShippingMethods({ cart_id: '123'}, customQuery);
 *
 * // result contains the customer addresses with only the city method_title. Of course, it has same shape as in the "simple usage" example.
 * ```
 */
export async function getAvailableShippingMethods(
  context: Context,
  params: GuestAvailableShippingMethodsQueryVariables,
  customQuery: CustomQuery = { shippingMethods: "shippingMethods" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQuery>> {
  const { shippingMethods } = context.extendQuery(customQuery, {
    shippingMethods: {
      query: GuestAvailableShippingMethods,
      variables: { ...params },
    },
  });

  try {
    return await context.client.query<GuestAvailableShippingMethodsQuery, GuestAvailableShippingMethodsQueryVariables>({
      query: gql`
        ${shippingMethods.query}
      `,
      variables: shippingMethods.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
