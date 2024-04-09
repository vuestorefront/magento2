import { ApolloQueryResult, gql } from "@apollo/client/core";
import { CustomQuery, GuestAvailableShippingMethodsQuery, GuestAvailableShippingMethodsQueryVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { Context } from "../../types/context";
import GuestAvailableShippingMethods from "./GuestAvailableShippingMethods";
import getHeaders from "../getHeaders";

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
