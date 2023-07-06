import { ApolloQueryResult } from "@apollo/client/core";
import {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductsListQuery,
  ProductsListQueryVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import consola from "consola";
import productsListQuery from "./productsList";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

/**
 * Fetches products using received search term and params for filter, sort and
 * pagination.
 *
 * @param context VSF context
 * @param searchParams search term and params for filter, sort and pagination
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function products(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { products: "products" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<ProductsListQuery>> {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize <= 0 ? 10 : defaultParams.pageSize,
    currentPage: defaultParams.currentPage <= 0 ? 1 : defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { products: productsGQL } = context.extendQuery(customQuery, {
    products: {
      query: productsListQuery,
      variables,
    },
  });

  try {
    return await context.client.query<ProductsListQuery, ProductsListQueryVariables>({
      query: gql`
        ${productsGQL.query}
      `,
      variables: productsGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      consola.debug(error);

      return {
        ...error,
        errors: error.graphQLErrors,
        data: null,
      };
    }
    consola.error(error);
    throw error.networkError?.result || error;
  }
}
