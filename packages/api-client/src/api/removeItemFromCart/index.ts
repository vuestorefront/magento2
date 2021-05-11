import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  RemoveItemFromCartInput,
  RemoveItemFromCartMutation,
  RemoveItemFromCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: RemoveItemFromCartInput,
): Promise<FetchResult<RemoveItemFromCartMutation>> => client
  .mutate<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>({
  mutation,
  variables: { input },
});
