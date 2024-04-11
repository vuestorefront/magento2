import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders, Query } from "@vue-storefront/magento-types";
import { CustomQuery, QueryCategoriesArgs } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import categoriesQuery from "./categories";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetches categories.
 *
 * @param context Context
 * @param params
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export async function categories(
  context: Context,
  params: QueryCategoriesArgs,
  customQuery: CustomQuery = { categories: "categories" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<Query["categories"]>> {
  const { categories: categoriesGQL } = context.extendQuery(customQuery, {
    categories: {
      query: categoriesQuery,
      variables: { ...params },
    },
  });

  return context.client.query<Query["categories"], QueryCategoriesArgs>({
    query: gql`
      ${categoriesGQL.query}
    `,
    variables: categoriesGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
