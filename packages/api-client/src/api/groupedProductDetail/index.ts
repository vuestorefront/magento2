import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import { print } from 'graphql';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  GroupedProductDetailQuery,
  GroupedProductDetailQueryVariables,
} from '../../types/GraphQL';
import groupedProductDetailQuery from './groupedProductDetailQuery';
import { Context } from '../../types/context';
import { GetProductSearchParams } from '../../types/API';

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

export default async (
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<GroupedProductDetailQuery>> => {
  const defaultParams = {
    pageSize: 20,
    currentPage: 1,
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
        query: groupedProductDetailQuery,
        variables: defaultParams,
      },
    },
  );
  try {
    return await context.client.query<GroupedProductDetailQuery, GroupedProductDetailQueryVariables>({
      query: gql`${products.query}`,
      variables: products.variables,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
