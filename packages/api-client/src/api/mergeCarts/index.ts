import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import { MergeCartsMutation, MergeCartsMutationVariables } from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  sourceCartId: string,
  destinationCartId: string,
): Promise<FetchResult<MergeCartsMutation>> => client
  .mutate<MergeCartsMutation, MergeCartsMutationVariables>({
  mutation,
  variables: {
    sourceCartId,
    destinationCartId,
  },
});
