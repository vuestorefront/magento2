import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  UpdateCartItemsInput,
  UpdateCartItemsMutation,
  UpdateCartItemsMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: UpdateCartItemsInput,
): Promise<FetchResult<UpdateCartItemsMutation>> => client
  .mutate<
UpdateCartItemsMutation,
UpdateCartItemsMutationVariables>({
  mutation,
  variables: { input },
});
