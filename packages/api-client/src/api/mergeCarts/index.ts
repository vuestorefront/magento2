import { FetchResult } from '@apollo/client';
import mergeCarts from './mergeCarts';
import { MergeCartsMutation, MergeCartsMutationVariables } from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  sourceCartId: string,
  destinationCartId: string,
): Promise<FetchResult<MergeCartsMutation>> => client
  .mutate<MergeCartsMutation, MergeCartsMutationVariables>({
  mutation: mergeCarts,
  variables: {
    sourceCartId,
    destinationCartId,
  },
});
