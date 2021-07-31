import { FetchResult } from '@apollo/client';
import removeItemFromCart from './removeItemFromCart';
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
  mutation: removeItemFromCart,
  variables: { input },
});
