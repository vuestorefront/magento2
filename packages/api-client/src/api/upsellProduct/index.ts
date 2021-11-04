import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput, UpsellProductsQuery, UpsellProductsQueryVariables,
} from '../../types/GraphQL';
import upsellProducts from './upsellProducts';
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
): Promise<ApolloQueryResult<UpsellProductsQuery>> => {
  const defaultParams = {
    pageSize: 10,
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
        query: upsellProducts,
        variables,
      },
    },
  );

  try {
    return await context.client.query<UpsellProductsQuery, UpsellProductsQueryVariables>({
      query: gql`${products.query}`,
      variables: products.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
