import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import applyCouponToCart from './applyCouponToCart';
import {
  ApplyCouponToCartInput,
  ApplyCouponToCartMutation,
  ApplyCouponToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
// @TODO : Add Mutation FROM CodeGEN

export default async (
  context: Context,
  input: ApplyCouponToCartInput,
  customQuery: CustomQuery = { applyCouponToCart: 'applyCouponToCart' },
): Promise<FetchResult<ApplyCouponToCartMutation>> => {
  const { applyCouponToCart: applyCouponToCartGQL } = context.extendQuery(
    customQuery,
    {
      applyCouponToCart: {
        query: applyCouponToCart,
        variables: { input },
      },
    },
  );
  return context.client.mutate<ApplyCouponToCartMutation, ApplyCouponToCartMutationVariables>({
    mutation: applyCouponToCartGQL.query,
    variables: applyCouponToCartGQL.variables,
  });
};
