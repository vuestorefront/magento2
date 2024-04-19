import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomerUpdateInput, CustomQuery, UpdateCustomerMutation, UpdateCustomerMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import updateCustomerQuery from "./updateCustomer";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Update customer data.
 * Customer data is updated based on the current customer token.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Updates customer first name
 * const result = await sdk.magento.updateCustomer({
 *   firstname: 'New John'
 * });
 *
 * // result contains updated customer data
 * console.log(result); // result.data.updateCustomerV2.customer.firstname === 'New John'
 * ```
 *
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'update-customer-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation updateCustomer($input: CustomerUpdateInput!) {
 *                updateCustomerV2(input: $input) {
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
 * Using a custom GraphQL query to reduce the amount of data returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   updateCustomer: 'update-customer-custom-query',
 *   metadata: {
 *     fields: 'firstname lastname'
 *   }
 * };
 *
 * const result = await sdk.magento.updateCustomer({
 *   firstname: 'New John'
 *   lastname: 'New Doe'
 * }, customQuery);
 *
 * // result contains only the fields specified in the custom query
 * // result.data.updateCustomerV2.customer.firstname === 'New John'
 * // result.data.updateCustomerV2.customer.lastname === 'New Doe'
 * console.log(result); // result.data.updateCustomerV2.customer.firstname === 'New John'
 * ```
 */
export async function updateCustomer(
  context: Context,
  input: CustomerUpdateInput,
  customQuery: CustomQuery = { updateCustomer: "updateCustomer" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<UpdateCustomerMutation>> {
  const { updateCustomer: updateCustomerGQL } = context.extendQuery(customQuery, {
    updateCustomer: {
      query: updateCustomerQuery,
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
}
