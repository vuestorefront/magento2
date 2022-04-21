import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductsListQuery,
  ProductsListQueryVariables,
} from '../../types/GraphQL';
import productsListQuery from './productsList';
import { Context } from '../../types/context';
import { GetProductSearchParams } from '../../types/API';

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
 */
export default async function products(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { products: 'products' },
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
      query: productsGQL.query,
      variables: productsGQL.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
