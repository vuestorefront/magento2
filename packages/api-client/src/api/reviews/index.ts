import { ApolloQueryResult } from '@apollo/client/core';
import {
  CustomerProductReviewParams,
  CustomerProductReviewQuery,
  CustomerProductReviewQueryVariables,
  CustomHeaders,
  CustomQuery,
} from '@vue-storefront/magento-types';
import gql from 'graphql-tag';
import customerProductReview from './reviews';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Returns product reviews created by the current customer
 */
export default async (
  context: Context,
  searchParams?: CustomerProductReviewParams,
  customQuery: CustomQuery = { reviews: 'reviews' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CustomerProductReviewQuery>> => {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
  };

  const variables: CustomerProductReviewParams = {
    pageSize: searchParams?.pageSize ?? defaultParams.pageSize,
    currentPage: searchParams?.currentPage ?? defaultParams.currentPage,
  };

  const { reviews } = context.extendQuery(customQuery, {
    reviews: {
      query: customerProductReview,
      variables,
    },
  });

  try {
    return await context.client.query<CustomerProductReviewQuery, CustomerProductReviewQueryVariables>({
      query: gql`${reviews.query}`,
      variables: reviews.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
