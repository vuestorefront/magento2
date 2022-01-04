import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductsListQuery,
  ProductsListQueryVariables,
  CachedQuery,
} from '../../types/GraphQL';
import productsList from './productsList';
import { Context } from '../../types/context';
import { GetProductSearchParams } from '../../types/API';

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  withAggregations?: boolean;
};

export default async (
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { products: 'products' },
): Promise<ApolloQueryResult<CachedQuery<ProductsListQuery>>> => {
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

  if (defaultParams.withAggregations) variables.withAggregations = defaultParams.withAggregations;

  const { products } = context.extendQuery(
    customQuery,
    {
      products: {
        query: productsList,
        variables,
      },
    },
  );

  return await context.client.query<CachedQuery<ProductsListQuery>, ProductsListQueryVariables>({
    query: products.query,
    variables: products.variables,
  });
};
