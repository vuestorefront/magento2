import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQuery,
  ProductDetailsQueryVariables,
  ProductsListQuery,
  ProductsListQueryVariables,
} from '../../types/GraphQL';
import listQuery from './productsListQuery.graphql';
import detailQuery from './productDetailsQuery.graphql';
import { Context } from '../../types/context';
import { GetProductSearchParams, ProductsQueryType } from '../../types/API';

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

const getProduct = async (
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<ProductDetailsQuery | ProductsListQuery>> => {
  const defaultParams = {
    pageSize: 20,
    currentPage: 1,
    queryType: ProductsQueryType.List,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { products } = context.extendQuery(
    customQuery, {
      products: {
        query: defaultParams.queryType === ProductsQueryType.List ? listQuery : detailQuery,
        variables: defaultParams,
      },
    },
  );

  return context.client.query<ProductDetailsQuery | ProductsListQuery, ProductDetailsQueryVariables | ProductsListQueryVariables>({
    query: products.query,
    variables: products.variables,
    fetchPolicy: 'no-cache',
  });
};

export default getProduct;
