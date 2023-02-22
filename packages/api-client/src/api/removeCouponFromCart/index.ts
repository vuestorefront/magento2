import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/middleware';
import type { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import {
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
  RemoveCouponFromCartMutationVariables,
} from '../../types/GraphQL';
import removeCouponFromCartMutation from './removeCouponFromCart';
import getHeaders from '../getHeaders';

/**
 * Removes a coupon from a cart
 * @param context VSF context
 * @param input ID of the cart and coupon to remove
 * @param customQuery custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function removeCouponFromCart(
  context: Context,
  input: RemoveCouponFromCartInput,
  customQuery: CustomQuery = { removeCouponFromCart: 'removeCouponFromCart' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<RemoveCouponFromCartMutation>> {
  const { removeCouponFromCart: removeCouponFromCartGQL } = context.extendQuery(
    customQuery,
    {
      removeCouponFromCart: {
        query: removeCouponFromCartMutation,
        variables: { input },
      },
    },
  );

  return context.client.mutate<RemoveCouponFromCartMutation, RemoveCouponFromCartMutationVariables>({
    mutation: removeCouponFromCartGQL.query,
    variables: removeCouponFromCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
