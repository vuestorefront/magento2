import type { ApolloQueryResult } from "@apollo/client/core";
import type {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQuery,
  ProductDetailsQueryVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import consola from "consola";
import productDetailsQuery from "./productDetailsQuery";
import type { Context } from "../../types/context";
import getHeaders from "../getHeaders";

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

/**
 * Fetches the list of products with details using sort, filters and pagination.
 *
 * @param context VSF context
 * @param searchParams params with sort, filters and pagination
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export async function productDetails(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { productDetails: "productDetails" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<ProductDetailsQuery>> {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    ...defaultParams,
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { productDetails: productDetailGQL } = context.extendQuery(customQuery, {
    productDetails: {
      query: productDetailsQuery,
      variables,
    },
  });
  try {
    return await context.client.query<ProductDetailsQuery, ProductDetailsQueryVariables>({
      query: gql`
        ${productDetailGQL.query}
      `,
      variables: productDetailGQL.variables,
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
