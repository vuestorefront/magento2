import { FetchResult } from '@apollo/client';
import { CreateProductReviewMutation, CreateProductReviewMutationVariables } from '../../types/GraphQL';
import mutation from './mutation.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context, input: CreateProductReviewMutationVariables): Promise<FetchResult<CreateProductReviewMutation>> => client
  .mutate<CreateProductReviewMutation, { input: CreateProductReviewMutationVariables }>({
  mutation,
  variables: {
    input,
  },
});
