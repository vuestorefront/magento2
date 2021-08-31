import { FetchResult } from '@apollo/client/core';
import removeGiftCardFromCart from './removeGiftCardFromCart';
import {
  RemoveGiftCardFromCartInput,
  RemoveGiftCardFromCartMutation,
  RemoveGiftCardFromCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: RemoveGiftCardFromCartInput,
): Promise<FetchResult<RemoveGiftCardFromCartMutation>> => client
  .mutate<RemoveGiftCardFromCartMutation, RemoveGiftCardFromCartMutationVariables>({
  mutation: removeGiftCardFromCart,
  variables: { input },
});
