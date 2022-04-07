import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { Context } from '../../types/context';
import {
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
  RemoveCouponFromCartMutationVariables,
} from '../../types/GraphQL';
import removeCouponFromCartMutation from './removeCouponFromCart';

/**
 * Removes a coupon from a cart
 * @param context VSF context
 * @param input ID of the cart and coupon to remove
 * @param customQuery custom GraphQL query that extends the default one
 */
export default async function removeCouponFromCart(
  context: Context,
  input: RemoveCouponFromCartInput,
  customQuery: CustomQuery = { removeCouponFromCart: 'removeCouponFromCart' },
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
  });
}
