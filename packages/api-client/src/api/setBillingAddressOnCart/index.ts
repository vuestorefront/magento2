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

/**
 * Set billing address on the cart
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Prepare parameters
 * const params = {
 *   cart_id: 'some-cart-id',
 *   billing_address: {
 *       address: {
 *        firstname: 'John',
 *        lastname: 'Doe',
 *        city: 'New York',
 *        country_code: 'US',
 *        street: ['Street 1', 'Street 2'],
 *        telephone: '123 123 123',
 *        region: 'AL',
 *        postcode: '10001',
 *        save_in_address_book: false
 *       },
 *     }
 * };
 *
 * // Set shipping address on the cart
 * await sdk.magento.setBillingAddressOnCart(params);
 * ```

 * @example
 * Creating a custom GraphQL query for reducing the amount of fields returned by the query, when compared to the default query.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'set-billing-address-on-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation setBillingAddressOnCart($input: SetBillingAddressOnCartInput) {
 *                setBillingAddressOnCart(input: $input) {
 *                cart {
 *                  ${metadata.fields}
 *                }
 *              }
 *            }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   setBillingAddressOnCart: 'set-billing-address-on-cart-custom-query',
 *   metadata: {
 *     fields: 'billing_address { city }'
 *   }
 * };
 *
 * // data will contain only the fields specified in the custom query.
 * const { data } = await sdk.magento.setBillingAddressOnCart(params, customQuery);
 * ```
 */
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
