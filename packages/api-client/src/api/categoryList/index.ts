import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CategoryListQuery, CustomQuery, QueryCategoryListArgs } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import categoryListQuery from "./categoryList";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetch list of all categories without filters
 *
 * @deprecated
 * Use `categories` method instead.
 */
export async function categoryList(
  context: Context,
  params: QueryCategoryListArgs,
  customQuery: CustomQuery = { categoryList: "categoryList" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CategoryListQuery>> {
  const { categoryList: categoryListGQL } = context.extendQuery(customQuery, {
    categoryList: {
      query: categoryListQuery,
      variables: { ...params },
    },
  });

  return context.client.query<CategoryListQuery, QueryCategoryListArgs>({
    query: gql`
      ${categoryListGQL.query}
    `,
    variables: categoryListGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
