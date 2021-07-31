import { FetchResult } from '@apollo/client';
import applyCouponToCart from './applyCouponToCart';
import {
  ApplyCouponToCartInput,
  ApplyCouponToCartMutation,
  ApplyCouponToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
// @TODO : Add Mutation FROM CodeGEN

export default async (
  { client }: Context,
  input: ApplyCouponToCartInput,
): Promise<FetchResult<ApplyCouponToCartMutation>> => client
  .mutate<ApplyCouponToCartMutation, ApplyCouponToCartMutationVariables>({
  mutation: applyCouponToCart,
  variables: { input },
});
