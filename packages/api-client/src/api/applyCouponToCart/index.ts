import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import type { Context } from '../../types/context';
import {
  ApplyCouponToCartInput,
  ApplyCouponToCartMutation,
  ApplyCouponToCartMutationVariables,
} from '../../types/GraphQL';
import applyCouponToCartMutation from './applyCouponToCart';
// @TODO : Add Mutation FROM CodeGEN

/**
 * Applies a coupon to a given card
 * @param context VSF context
 * @param input ID of the card and coupon to apply
 * @param customQuery custom GraphQL query that extends the default one
 */
export default async function applyCouponToCart(
  context: Context,
  input: ApplyCouponToCartInput,
  customQuery: CustomQuery = { applyCouponToCart: 'applyCouponToCart' },
): Promise<FetchResult<ApplyCouponToCartMutation>> {
  const { applyCouponToCart: applyCouponToCartGQL } = context.extendQuery(
    customQuery,
    {
      applyCouponToCart: {
        query: applyCouponToCartMutation,
        variables: { input },
      },
    },
  );
  return context.client.mutate<ApplyCouponToCartMutation, ApplyCouponToCartMutationVariables>({
    mutation: applyCouponToCartGQL.query,
    variables: applyCouponToCartGQL.variables,
  });
}
