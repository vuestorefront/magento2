import { FetchResult } from '@apollo/client';
import { CreateProductReviewMutation, CreateProductReviewMutationVariables } from '../../types/GraphQL';
import createProductReview from './createProductReview';
import { Context } from '../../types/context';

export default async ({ client }: Context, input: CreateProductReviewMutationVariables): Promise<FetchResult<CreateProductReviewMutation>> => client
  .mutate<CreateProductReviewMutation, { input: CreateProductReviewMutationVariables }>({
  mutation: createProductReview,
  variables: {
    input,
  },
});
