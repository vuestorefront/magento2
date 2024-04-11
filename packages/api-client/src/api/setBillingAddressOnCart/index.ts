import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import {
  CustomQuery,
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartMutation,
  SetBillingAddressOnCartMutationVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import setBillingAddressOnCartQuery from "./setBillingAddressOnCart";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

export async function setBillingAddressOnCart(
  context: Context,
  input: SetBillingAddressOnCartInput,
  customQuery: CustomQuery = { setBillingAddressOnCart: "setBillingAddressOnCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<SetBillingAddressOnCartMutation>> {
  const { setBillingAddressOnCart: setBillingAddressOnCartGQL } = context.extendQuery(customQuery, {
    setBillingAddressOnCart: {
      query: setBillingAddressOnCartQuery,
      variables: { input },
    },
  });

  return context.client.mutate<SetBillingAddressOnCartMutation, SetBillingAddressOnCartMutationVariables>({
    mutation: gql`
      ${setBillingAddressOnCartGQL.query}
    `,
    variables: setBillingAddressOnCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
