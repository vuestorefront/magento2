import { ApolloQueryResult, gql } from "@apollo/client/core";
import { CustomQuery, CategorySearchQuery, CategorySearchQueryVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import categorySearchQuery from "./categorySearch";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Search categories
 *
 * @example
 * Simple usage without filters
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of categories with default parameters
 * const categories = await sdk.magento.categorySearch();
 * ```
 *
 * @example
 * Usage with filters
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of categories with custom parameters
 * const details = await sdk.magento.categorySearch({
 *  filters: {
 *    category_uid: {
 *      in: ['MjA=']
 *    }
 *  }
 * });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for searching categories
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'category-search-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
                query categorySearch($filters: CategoryFilterInput) {
                  categoryList(filters: $filters) {
                    ${metadata.fields}
                  }
                }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to search categories.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *    categorySearch: 'category-search-custom-query',
 *    metadata: {
 *      fields: 'children_count products { total_count }'
 *    }
 * };
 *
 * const result = await sdk.magento.categorySearch({
 *  filter: {
 *    category_uid: {
 *      in: ['=MjA']
 *    }
 *  }
 * }, customQuery);
 *
 * // Details will contain only the fields specified in the custom query.
 * ```
 */
export async function categorySearch(
  context: Context,
  filters: CategorySearchQueryVariables,
  customQuery: CustomQuery = { categorySearch: "categorySearch" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CategorySearchQuery>> {
  const { categorySearch: categorySearchGQL } = context.extendQuery(customQuery, {
    categorySearch: {
      query: categorySearchQuery,
      variables: { ...filters },
    },
  });

  return context.client.query<CategorySearchQuery, CategorySearchQueryVariables>({
    query: gql`
      ${categorySearchGQL.query}
    `,
    variables: categorySearchGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
