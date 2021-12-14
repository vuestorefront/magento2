import { FetchResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/core';
import { CreateProductReviewMutation, CreateProductReviewMutationVariables } from '../../types/GraphQL';
import createProductReview from './createProductReview';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CreateProductReviewMutationVariables,
  customQuery: CustomQuery = { createProductReview: 'createProductReview' },
): Promise<FetchResult<CreateProductReviewMutation>> => {
  const { createProductReview: createProductReviewGQL } = context.extendQuery(
    customQuery,
    {
      createProductReview: {
        query: createProductReview,
        variables: { input },
      },
    },
  );

  return context.client.mutate<CreateProductReviewMutation, { input: CreateProductReviewMutationVariables }>({
    mutation: createProductReviewGQL.query,
    variables: {
      input,
    },
  });
};
