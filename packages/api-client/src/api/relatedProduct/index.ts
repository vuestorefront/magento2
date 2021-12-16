import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  RelatedProductQuery,
  RelatedProductQueryVariables,
} from '../../types/GraphQL';
import relatedProduct from './relatedProduct';
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
  customQuery: CustomQuery = { relatedProduct: 'relatedProduct' },
): Promise<ApolloQueryResult<RelatedProductQuery>> => {
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

  const { relatedProduct: relatedProductGQL } = context.extendQuery(customQuery, {
    relatedProduct: {
      query: relatedProduct,
      variables,
    },
  });

  try {
    return await context.client.query<RelatedProductQuery, RelatedProductQueryVariables>({
      query: gql`${relatedProductGQL.query}`,
      variables: relatedProductGQL.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
