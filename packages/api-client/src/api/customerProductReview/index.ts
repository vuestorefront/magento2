import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import {
  CustomerProductReviewQuery,
  CustomerProductReviewQueryVariables,
} from '../../types/GraphQL';
import reviewQuery from './query.graphql';
import { Context } from '../../types/context';

export type CustomerProductReviewParams = {
  pageSize: number;
  currentPage: number;
};

export default async (
  context: Context,
  searchParams?: CustomerProductReviewParams,
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<CustomerProductReviewQuery>> => {
  const defaultParams = {
    pageSize: 20,
    currentPage: 1,
    ...searchParams,
  };

  const variables: CustomerProductReviewParams = {
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  const { reviews } = context.extendQuery(
    customQuery, {
      reviews: {
        query: reviewQuery,
        variables,
      },
    },
  );

  return context.client.query<CustomerProductReviewQuery, CustomerProductReviewQueryVariables>({
    query: reviews.query,
    variables: reviews.variables,
    fetchPolicy: 'no-cache',
  });
};
