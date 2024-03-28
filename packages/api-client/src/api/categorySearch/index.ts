import { ApolloQueryResult, gql } from "@apollo/client/core";
import { CustomQuery, CategorySearchQuery, CategorySearchQueryVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import categorySearchQuery from "./categorySearch";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Searches for categories using received filters.
 *
 * @param context VSF Context
 * @param filters filters used to search for categories. A filter contains at
 * least one attribute, a comparison operator, and the value that is being
 * searched for.
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
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
