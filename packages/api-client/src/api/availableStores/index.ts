import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { AvailableStoresQuery, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import availableStoresQuery from "./availableStores";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetch available stores
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch available stores
 * const result = await sdk.magento.availableStores();
 *
 * // result.data.availableStores contains the available stores
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
 *         'available-stores-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query availableStores {
 *                availableStores {
 *                  ${metadata?.fields}
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
 * Using a custom GraphQL query to reduce the amount of fields returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   availableStores: 'available-stores-custom-query',
 *   metadata: {
 *     fields: 'code store_name'
 *   }
 * };
 *
 * const result = await sdk.magento.availableStores(customQuery);
 *
 * // result.data.availableStores contains the available stores with only the fields specified in the custom query
 * ```
 */
export async function availableStores(
  context: Context,
  customQuery: CustomQuery = { availableStores: "availableStores" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<AvailableStoresQuery>> {
  const { availableStores: availableStoresGQL } = context.extendQuery(customQuery, {
    availableStores: {
      query: availableStoresQuery,
    },
  });

  return context.client.query<AvailableStoresQuery>({
    query: gql`
      ${availableStoresGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
