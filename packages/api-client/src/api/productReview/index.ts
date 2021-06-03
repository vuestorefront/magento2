import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductReviewQuery,
  ProductReviewQueryVariables,
} from '../../types/GraphQL';
import reviewQuery from './productReviewQuery.graphql';
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
): Promise<ApolloQueryResult<ProductReviewQuery>> => {
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

  const { reviews } = context.extendQuery(
    customQuery, {
      reviews: {
        query: reviewQuery,
        variables,
      },
    },
  );

  return context.client.query<ProductReviewQuery, ProductReviewQueryVariables>({
    query: reviews.query,
    variables: reviews.variables,
    fetchPolicy: 'no-cache',
  });
};
