import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomerUpdateInput, CustomQuery, UpdateCustomerMutation, UpdateCustomerMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import updateCustomer from "./updateCustomer";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Updates the data of the current customer. To override the default query, use the `updateCustomer` query key.
 */
export default async (
  context: Context,
  input: CustomerUpdateInput,
  customQuery: CustomQuery = { updateCustomer: "updateCustomer" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<UpdateCustomerMutation>> => {
  const { updateCustomer: updateCustomerGQL } = context.extendQuery(customQuery, {
    updateCustomer: {
      query: updateCustomer,
      variables: { input },
    },
  });

  return context.client.mutate<UpdateCustomerMutation, UpdateCustomerMutationVariables>({
    mutation: gql`
      ${updateCustomerGQL.query}
    `,
    variables: updateCustomerGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
