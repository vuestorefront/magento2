import { FetchResult, gql } from "@apollo/client/core";
import { CustomQuery, UpdateCustomerAddressMutation, UpdateCustomerAddressMutationVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import updateCustomerAddressMutation from "./updateCustomerAddress";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Update customer address
 * The user needs to be logged in in order to send this request
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch updated customer address
 * const result = await sdk.magento.updateCustomerAddress();
 * ```
 *
 * @example
 * Creating a custom GraphQL query for updating customer address
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'update-customer-address-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation updateCustomerAddress($id: Int!, $input: CustomerAddressInput) {
 *                updateCustomerAddress(id: $id, input: $input) {
 *                  ${metadata.fields}
 *                }
 *              }
 *              `
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to update customer address
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   updateCustomerAddress: 'update-customer-address-custom-query',
 *   metadata: {
 *     fields: 'id city company'
 *   }
 * };
 *
 * const result = await sdk.magento.updateCustomerAddress({ id: 308, input: { city: "Warsaw" }  }, customQuery);
 *
 * // result will contain only the fields specified in the custom query.
 * ```
 */
export async function updateCustomerAddress(
  context: Context,
  params: UpdateCustomerAddressMutationVariables,
  customQuery: CustomQuery = { updateCustomerAddress: "updateCustomerAddress" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<UpdateCustomerAddressMutation>> {
  const { updateCustomerAddress: updateCustomerAddressGQL } = context.extendQuery(customQuery, {
    updateCustomerAddress: {
      query: updateCustomerAddressMutation,
      variables: {
        id: params.id,
        input: params.input,
      },
    },
  });

  return context.client.mutate<UpdateCustomerAddressMutation, UpdateCustomerAddressMutationVariables>({
    mutation: gql`
      ${updateCustomerAddressGQL.query}
    `,
    variables: updateCustomerAddressGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
