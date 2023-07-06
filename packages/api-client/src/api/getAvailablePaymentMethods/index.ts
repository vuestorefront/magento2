import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders, GuestAvailablePaymentMethodsQuery, GuestAvailablePaymentMethodsQueryVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { Context } from "../../types/context";
import GuestAvailablePaymentMethods from "./GuestAvailablePaymentMethods";
import getHeaders from "../getHeaders";

/**
 * Fetches the available payment methods for the received cart.
 *
 * @param context VSF context
 * @param cartId cart ID
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function getAvailablePaymentMethods(
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
