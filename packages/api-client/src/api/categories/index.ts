import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders, Query } from "@vue-storefront/magento-types";
import { CustomQuery, QueryCategoriesArgs } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import categoriesQuery from "./categories";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

export type CategoriesQuery = Required<Pick<Query, "categories">>;

/**
 * Fetch list of all categories matching specified filters
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of categories with default parameters
 * const categories = await sdk.magento.categories({});
 * ```
 *
 * @example
 * Creating a custom GraphQL query for fetching categories.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'categories-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query categories {
 *                 categories {
 *                   ${metadata.fields}
 *                 }
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
 * Using a custom GraphQL query to fetch categories.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  categories: 'categories-custom-query',
 *    metadata: {
 *      fields: 'items { uid name }'
 *    }
 * };
 *
 * const categories = await sdk.magento.categories({}, customQuery);
 *
 * // Category list will contain only the fields specified in the custom query.
 * ```
 */
export async function categories(
  context: Context,
  params: QueryCategoriesArgs,
  customQuery: CustomQuery = { categories: "categories" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CategoriesQuery>> {
  const { categories: categoriesGQL } = context.extendQuery(customQuery, {
    categories: {
      query: categoriesQuery,
      variables: { ...params },
    },
  });

  return context.client.query<CategoriesQuery, QueryCategoriesArgs>({
    query: gql`
      ${categoriesGQL.query}
    `,
    variables: categoriesGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
