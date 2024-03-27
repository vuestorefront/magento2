import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { ChangeCustomerPasswordMutation, ChangeCustomerPasswordMutationVariables, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import changeCustomerPasswordQuery from "./changeCustomerPassword";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Changes password of the current customer. To override the default query, use the `changeCustomerPassword` query key.
 */
export const changeCustomerPassword = async (
  context: Context,
  params: { currentPassword: string; newPassword: string },
  customQuery: CustomQuery = { changeCustomerPassword: "changeCustomerPassword" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<ChangeCustomerPasswordMutation>> => {
  try {
    const { changeCustomerPassword: changeCustomerPasswordGQL } = context.extendQuery(customQuery, {
      changeCustomerPassword: {
        query: changeCustomerPasswordQuery,
        variables: { ...params },
      },
    });
    return await context.client.mutate<ChangeCustomerPasswordMutation, ChangeCustomerPasswordMutationVariables>({
      mutation: gql`
        ${changeCustomerPasswordGQL.query}
      `,
      variables: changeCustomerPasswordGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      return {
        errors: error.graphQLErrors,
        data: null,
      };
    }
    throw error.networkError?.result || error;
  }
};
