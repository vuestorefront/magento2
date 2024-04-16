import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { ChangeCustomerPasswordMutation, ChangeCustomerPasswordMutationVariables, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import changeCustomerPasswordQuery from "./changeCustomerPassword";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Change customer password.
 *
 * @example
 * Simple usage, change customer password:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const result = await sdk.magento.changeCustomerPassword({
 *  currentPassword: 'currentPassword',
 *  newPassword: 'newPassword'
 * });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for changeCustomerPassword:
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'change-customer-password-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
 *               changeCustomerPassword(
 *                 currentPassword: $currentPassword
 *                 newPassword: $newPassword
 *               ) {
 *                 ${metadata.fields}
 *               }
 *             }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to narrow down the response data:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   changeCustomerPassword: 'change-customer-password-custom-query',
 *   metadata: {
 *     fields: 'email'
 *   }
 * };
 *
 * const result = await sdk.magento.changeCustomerPassword({
 *  currentPassword: 'currentPassword',
 *  newPassword: 'newPassword'
 * }, customQuery);
 * ```
 */
export async function changeCustomerPassword(
  context: Context,
  params: { currentPassword: string; newPassword: string },
  customQuery: CustomQuery = { changeCustomerPassword: "changeCustomerPassword" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<ChangeCustomerPasswordMutation>> {
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
}
