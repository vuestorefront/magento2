import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CmsBlockQuery, CmsBlockQueryVariables, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import cmsBlocksQuery from "./cmsBlocks";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetch cms blocks.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch few cms blocks by their identifiers
 * const { data } = await sdk.magento.cmsBlocks({
 *   identifiers: ['id1', 'id2']
 * });
 *
 * // result will contain cms blocks with the specified identifiers
 * data.cmsBlocks.items.forEach(block => console.log(block.identifier));
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
 *         'cms-blocks-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query cmsBlock($identifiers: [String]) {
 *                cmsBlocks(identifiers: $identifiers) {
 *                  items {
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
 * Using a custom GraphQL query to reduce the amount of fields returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * // fetch only title
 * const customQuery = {
 *   cmsBlocks: 'cms-blocks-custom-query',
 *   metadata: {
 *     fields: 'title'
 *   }
 * };
 *
 * const { data } = await sdk.magento.cmsBlocks({
 *   identifiers: ['id1', 'id2']
 * }, customQuery);
 *
 * // data will contain only block titles
 * ```
 */
export async function cmsBlocks(
  context: Context,
  identifiers: string,
  customQuery: CustomQuery = { cmsBlocks: "cmsBlocks" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CmsBlockQuery>> {
  const { cmsBlocks: cmsBlocksGQL } = context.extendQuery(customQuery, {
    cmsBlocks: {
      query: cmsBlocksQuery,
      variables: { identifiers },
    },
  });
  return context.client.query<CmsBlockQuery, CmsBlockQueryVariables>({
    query: gql`
      ${cmsBlocksGQL.query}
    `,
    variables: cmsBlocksGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
