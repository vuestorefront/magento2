import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductReviewQuery,
  ProductReviewQueryVariables,
} from '../../types/GraphQL';
import productReview from './productReview';
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
 * Returns reviews of the provided product
 */
export default async (
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { productReview: 'productReview' },
): Promise<ApolloQueryResult<ProductReviewQuery>> => {
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

  const { productReview: productReviewGQL } = context.extendQuery(customQuery, {
    productReview: {
      query: productReview,
      variables,
    },
  });

  try {
    return await context.client.query<ProductReviewQuery, ProductReviewQueryVariables>({
      query: productReviewGQL.query,
      variables: productReviewGQL.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
