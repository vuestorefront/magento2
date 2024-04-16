import { FetchResult, gql } from "@apollo/client/core";
import { CustomQuery, UpdateCustomerEmailMutation, UpdateCustomerEmailMutationVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import updateCustomerEmailQuery from "./updateCustomerEmail";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Update customer email
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // update customer
 * const result = await sdk.magento.updateCustomerEmail({ email: "johndoe@example.com", password: "hunter2" });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for updating customer
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'update-customer-email-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation updateCustomerEmail($email: String!, $password: String!) {
 *                updateCustomerEmail(email: $email, password: $password){
 *                  customer {
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
 * Using a custom GraphQL query to update customer
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   updateCustomerEmail: 'update-customer-email-custom-query',
 *   metadata: {
 *     fields: 'email firstname'
 *   }
 * };
 *
 * const result = await sdk.magento.updateCustomerEmail({ email: "johndoe@example.com", password: "hunter2" }, customQuery);
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
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
