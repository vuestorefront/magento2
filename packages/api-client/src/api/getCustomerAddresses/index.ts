import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomQuery, GetCustomerAddressesQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import getCustomerAddressesQuery from "./getCustomerAddresses";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetches customer addresses.
 *
 * @param context - VSF Context
 * @param [customQuery] - (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
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
