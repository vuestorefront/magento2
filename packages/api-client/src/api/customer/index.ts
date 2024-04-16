import { ApolloQueryResult, gql } from "@apollo/client/core";
import { CustomQuery, CustomerQuery } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import customerQuery from "./customer";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Get current customer information
 *
 * @example
 * The `customer()` returns the currently active user.
 * This means that the request needs to contain an authorization token, which will tell Magento whose customer data should be fetched.
 *
 * If your browser has a VSF customer cookie saved, you can just call `customer()` without any parameters - the token will be attached automatically on every request to the middleware.
 *
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch customer
 * const customer = await sdk.magento.customer();
 * ```
 *
 * @example
 * If you're calling `customer()` in a non-browser context (for example in integration tests) where it's not possible to save a cookie,
 * you can attach the token manually using `customHeaders`
 *
 * Usage with manual authorization:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const token = '123'
 * const customHeaders = { Authorization: `Bearer {token}` }
 *
 * // fetch customer
 * const customer = await sdk.magento.customer({ customHeaders });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for fetching customer
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'customer-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query customer {
 *                customer {
 *                  ${metadata.fields}
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
 * Using a custom GraphQL query to fetch customer
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   customer: 'customer-custom-query',
 *   metadata: {
 *     fields: 'email firstname lastname'
 *   }
 * };
 *
 * const customer = await sdk.magento.customer(customQuery);
 *
 * // customer will contain only the fields specified in the custom query.
 * ```
 */
export async function customer(
  context: Context,
  customQuery: CustomQuery = { customer: "customer" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CustomerQuery>> {
  const { customer: customerGQL } = context.extendQuery(customQuery, {
    customer: {
      query: customerQuery,
    },
  });

  return context.client.query<CustomerQuery>({
    query: gql`
      ${customerGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
