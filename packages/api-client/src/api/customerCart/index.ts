import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomerCartQuery, CustomHeaders, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import type { Context } from "../../types/context";
import customerCartQuery from "./customerCart";
import getHeaders from "../getHeaders";

/**
 * Fetch customer cart.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch customer cart
 * const { data } = await sdk.magento.customerCart();
 *
 * // data contains cart details
 * const email = data?.customerCart?.email;
 *
 * ```
 *
 * @example
 * Creating a custom GraphQL query for customerCart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'customer-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query customerCart {
 *                customerCart {
 *                  ${metadata.fields}
 *                }
 *              }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to reduce the amount of fields returned by the query, when compared to the default query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   customerCart: 'customer-cart-custom-query',
 *   metadata: {
 *     fields: 'id email items { id sku }
 *   }
 * };
 *
 * const result = await sdk.magento.customerCart(customQuery);
 *
 * // result contains cart details with only the fields specified in the custom query
 * ```
 */
export async function customerCart(
  context: Context,
  customQuery: CustomQuery = { customerCart: "customerCart" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CustomerCartQuery>> {
  const { customerCart: customerCartGQL } = context.extendQuery(customQuery, {
    customerCart: {
      query: customerCartQuery,
    },
  });

  return context.client.query<CustomerCartQuery>({
    query: gql`
      ${customerCartGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
