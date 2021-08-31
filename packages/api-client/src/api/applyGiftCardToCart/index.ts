import { FetchResult } from '@apollo/client/core';
import ApplyGiftCardToCart from './applyGiftCardToCart';
import {
  ApplyGiftCardToCartInput,
  ApplyGiftCardToCartMutation,
  ApplyGiftCardToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
// @TODO : Add Mutation FROM CodeGEN

export default async (
  { client }: Context,
  input: ApplyGiftCardToCartInput,
): Promise<FetchResult<ApplyGiftCardToCartMutation>> => client
  .mutate<ApplyGiftCardToCartMutation, ApplyGiftCardToCartMutationVariables>({
  mutation: ApplyGiftCardToCart,
  variables: { input },
});
