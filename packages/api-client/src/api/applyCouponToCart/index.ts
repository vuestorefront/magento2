import { FetchResult } from '@apollo/client/core';
import {
  CustomQuery,
  ApplyCouponToCartInput,
  ApplyCouponToCartMutation,
  ApplyCouponToCartMutationVariables,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import type { Context } from '../../types/context';
import applyCouponToCartMutation from './applyCouponToCart';
import getHeaders from '../getHeaders';

/**
 * Applies a coupon to a given card
 * @param context VSF context
 * @param input ID of the card and coupon to apply
 * @param customQuery custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function applyCouponToCart(
  context: Context,
  input: ApplyCouponToCartInput,
  customQuery: CustomQuery = { applyCouponToCart: 'applyCouponToCart' },
  customHeaders: CustomHeaders = {},
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
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
