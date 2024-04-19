import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomQuery, GetCustomerAddressesQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import getCustomerAddressesQuery from "./getCustomerAddresses";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Get customer addresses.
 * Customer must be logged in before calling this method.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch customer addresses if customer is logged in
 * const { data } = await sdk.magento.getCustomerAddresses();
 *
 * // data contains the customer addresses
 * data.customer.addresses; // array of customer addresses
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
 *         'get-customer-addresses-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query getCustomerAddresses {
 *                customer {
 *                  addresses {
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
 * Using a custom GraphQL query to reduce the amount of data returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   getCustomerAddresses: 'get-customer-addresses-custom-query',
 *   metadata: {
 *     fields: 'city'
 *   }
 * };
 *
 * const { data } = await sdk.magento.getCustomerAddresses(customQuery);
 *
 * // data contains the customer addresses with only the city field
 * ```
 */
export async function getCustomerAddresses(
  context: Context,
  customQuery: CustomQuery = { getCustomerAddresses: "getCustomerAddresses" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<GetCustomerAddressesQuery>> {
  const { getCustomerAddresses: getCustomerAddressesGQL } = context.extendQuery(customQuery, {
    getCustomerAddresses: {
      query: getCustomerAddressesQuery,
    },
  });

  try {
    return await context.client.query<GetCustomerAddressesQuery>({
      query: gql`
        ${getCustomerAddressesGQL.query}
      `,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
