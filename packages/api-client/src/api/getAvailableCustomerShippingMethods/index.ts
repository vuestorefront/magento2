import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomerAvailableShippingMethodsQuery, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { Context } from "../../types/context";
import CustomerAvailableShippingMethods from "./CustomerShippingMethods";
import getHeaders from "../getHeaders";

/**
 * Fetch available shipping methods for current customer.
 * Customer must be logged in.
 *
 *  @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch available shipping methods for current customer
 * const result = await sdk.magento.getAvailableCustomerShippingMethods();
 * // e.g. output:
 * // {
 * //   "data": {
 * //     "customerCart": {
 * //       "shipping_addresses": [
 * //         address1: {
 * //          "available_shipping_methods": [...]
 * //         },
 * //       ]
 * //     }
 * ```
 *
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'get-available-customer-shipping-methods-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query CustomerAvailableShippingMethods {
 *                customerCart {
 *                  ${metadata?.fields}
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
 * Using a custom GraphQL query to reduce the amount of data returned by the API
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 *
 * const customQuery = {
 *  getAvailableCustomerShippingMethods: 'get-available-customer-shipping-methods-custom-query',
 *  metadata: {
 *    fields: 'shipping_addresses { available_shipping_methods { available method_title } }'
 *  }
 * };
 *
 * const result = await sdk.magento.getAvailableCustomerShippingMethods(customQuery);
 *
 * // the result will contain only the data defined in the custom query
 * ```
 */
export async function getAvailableCustomerShippingMethods(
  context: Context,
  customQuery: CustomQuery = { shippingMethods: "shippingMethods" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQuery>> {
  const { shippingMethods } = context.extendQuery(customQuery, {
    shippingMethods: {
      query: CustomerAvailableShippingMethods,
    },
  });

  try {
    return await context.client.query<CustomerAvailableShippingMethodsQuery>({
      query: gql`
        ${shippingMethods.query}
      `,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
