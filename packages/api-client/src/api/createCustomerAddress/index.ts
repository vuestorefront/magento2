import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import {
  CreateCustomerAddressMutation,
  CreateCustomerAddressMutationVariables,
  CustomerAddressInput,
  CustomQuery,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import createCustomerAddressMutation from "./createCustomerAddress";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Create a customer address.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const address: CustomerAddressInput = {
 *  city: 'some city',
 *  country_code: CountryCodeEnum.Us,
 *  default_billing: false,
 *  default_shipping: false,
 *  firstname: 'John',
 *  lastname: 'Doe',
 *  postcode: '08701',
 *  street: ['street'],
 *  telephone: '123123123',
 *  region: {
 *    region_code: 'NJ',
 *    region_id: 41,
 *    region: 'New Jersey'
 *  }
 * };
 *
 * // customer address will be created for the currently logged in customer
 * await sdk.magento.createCustomerAddress(address);
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
 *         'create-customer-address-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation createCustomerAddress($input: CustomerAddressInput!) {
 *                createCustomerAddress(input: $input) {
 *                  ${metadata.fields}
 *                }
 *               }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to reduce the amount of data returned by the API
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   createCustomerAddress: 'create-customer-address-custom-query',
 *   metadata: {
 *     fields: 'id city'
 *   }
 * };
 *
 * // address parameter is the same as in the simple usage example
 * const result = await sdk.magento.createCustomerAddress(address, customQuery);
 *
 * result.data.createCustomerAddress.city; // 'some city'
 * ```
 */
export async function createCustomerAddress(
  context: Context,
  input: CustomerAddressInput,
  customQuery: CustomQuery = { createCustomerAddress: "createCustomerAddress" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<CreateCustomerAddressMutation>> {
  const { createCustomerAddress: createCustomerAddressGQL } = context.extendQuery(customQuery, {
    createCustomerAddress: {
      query: createCustomerAddressMutation,
      variables: { input },
    },
  });

  return context.client.mutate<CreateCustomerAddressMutation, CreateCustomerAddressMutationVariables>({
    mutation: gql`
      ${createCustomerAddressGQL.query}
    `,
    variables: createCustomerAddressGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
