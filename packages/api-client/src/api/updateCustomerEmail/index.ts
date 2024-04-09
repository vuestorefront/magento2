import { FetchResult, gql } from "@apollo/client/core";
import { CustomQuery, UpdateCustomerEmailMutation, UpdateCustomerEmailMutationVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import updateCustomerEmailQuery from "./updateCustomerEmail";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

export async function updateCustomerEmail(
  context: Context,
  input: UpdateCustomerEmailMutationVariables,
  customQuery: CustomQuery = { updateCustomerEmail: "updateCustomerEmail" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<UpdateCustomerEmailMutation>> {
  const { updateCustomerEmail: updateCustomerEmailGQL } = context.extendQuery(customQuery, {
    updateCustomerEmail: {
      query: updateCustomerEmailQuery,
      variables: { ...input },
    },
  });

  return context.client.mutate<UpdateCustomerEmailMutation, UpdateCustomerEmailMutationVariables>({
    mutation: gql`
      ${updateCustomerEmailGQL.query}
    `,
    variables: updateCustomerEmailGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
