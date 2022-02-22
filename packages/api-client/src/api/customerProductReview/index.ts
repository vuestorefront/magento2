import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import {
  CustomerProductReviewQuery,
  CustomerProductReviewQueryVariables,
} from '../../types/GraphQL';
import customerProductReview from './customerProductReview';
import { Context } from '../../types/context';

export type CustomerProductReviewParams = {
  pageSize: number;
  currentPage: number;
};

export default async (
  context: Context,
  searchParams?: CustomerProductReviewParams,
  customQuery: CustomQuery = { reviews: 'reviews' },
): Promise<ApolloQueryResult<CustomerProductReviewQuery>> => {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
  };

  const variables: CustomerProductReviewParams = {
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  const { reviews } = context.extendQuery(customQuery, {
    reviews: {
      query: customerProductReview,
      variables,
    },
  });

  try {
    return await context.client.query<CustomerProductReviewQuery, CustomerProductReviewQueryVariables>({
      query: reviews.query,
      variables: reviews.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
