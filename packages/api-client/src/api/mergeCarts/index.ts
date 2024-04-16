import { FetchResult, gql } from "@apollo/client/core";
import { CustomQuery, MergeCartsMutation, MergeCartsMutationVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import mergeCartsQuery from "./mergeCarts";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Merge carts
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const params = {
 *   sourceCartId: 'pCS0ykep1l3wGlPKSyWLJq5fb1DxIQcp',
 *   // this cart needs to have been created by a logged in user
 *   destinationCartId: 'xiYYh2ep0l3xGtPsz2WLJf5f31DxBJx0'
 * }
 *
 * // merge carts and return the result (cart)
 * const mergedCart = await sdk.magento.mergeCarts(params);
 * ```
 *
 * @example
 * Creating a custom GraphQL query for merging carts
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'merge-carts-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation mergeCarts($sourceCartId: String!, $destinationCartId: String!) {
 *                mergeCarts(source_cart_id: $sourceCartId, destination_cart_id: $destinationCartId) {
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
 * Using a custom GraphQL query to merge carts
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   cart: 'merge-carts-custom-query',
 *   metadata: {
 *     fields: 'id items { product { name } }'
 *   }
 * };
 *
 * const params = {
 *   sourceCartId: 'pCS0ykep1l3wGlPKSyWLJq5fb1DxIQcp',
 *   destinationCartId: 'xiYYh2ep0l3xGtPsz2WLJf5f31DxBJx0'
 * }
 * const mergedCart = await sdk.magento.mergeCarts(params, customQuery);
 *
 * // Merged cart will contain only the fields specified in the custom query.
 * ```
 */
export async function mergeCarts(
  context: Context,
  params: {
    sourceCartId: string;
    destinationCartId: string;
  },
  customQuery: CustomQuery = { mergeCarts: "mergeCarts" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<MergeCartsMutation>> {
  const { mergeCarts: mergeCartsGQL } = context.extendQuery(customQuery, {
    mergeCarts: {
      query: mergeCartsQuery,
      variables: {
        sourceCartId: params.sourceCartId,
        destinationCartId: params.destinationCartId,
      },
    },
  });

  return context.client.mutate<MergeCartsMutation, MergeCartsMutationVariables>({
    mutation: gql`
      ${mergeCartsGQL.query}
    `,
    variables: mergeCartsGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
