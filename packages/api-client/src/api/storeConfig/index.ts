import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomQuery, StoreConfigQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import storeConfigQuery from "./storeConfig";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetch store configuration
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch store configuration
 * const result = await sdk.magento.storeConfig();
 *
 * // result?.data?.storeConfig contains the store configuration
 * ```
 *
 * @example
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'store-config-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query storeConfig {
 *                storeConfig {
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
 * Using a custom GraphQL query to select only the fields you need
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // we want to fetch only logo related data
 * const customQuery = {
 *   storeConfig: 'store-config-custom-query',
 *   metadata: {
 *     fields: 'logo_alt logo_height logo_width'
 *   }
 * };
 *
 * const result = await sdk.magento.storeConfig(customQuery);
 * ```
 */
export async function storeConfig(
  context: Context,
  customQuery: CustomQuery = { storeConfig: "storeConfig" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<StoreConfigQuery>> {
  const { storeConfig: storeConfigGQL } = context.extendQuery(customQuery, {
    storeConfig: {
      query: storeConfigQuery,
    },
  });

  return context.client.query<StoreConfigQuery>({
    query: gql`
      ${storeConfigGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
