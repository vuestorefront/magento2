import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomerAvailableShippingMethodsQuery, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { Context } from "../../types/context";
import CustomerAvailableShippingMethods from "./CustomerShippingMethods";
import getHeaders from "../getHeaders";

/**
 * Retrive available shipping methods for current customer
 * @param context VSF Context
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
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
