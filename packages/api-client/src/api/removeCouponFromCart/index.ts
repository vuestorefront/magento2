import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import removeCouponFromCart from './removeCouponFromCart';
import {
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
  RemoveCouponFromCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: RemoveCouponFromCartInput,
  customQuery: CustomQuery = { removeCouponFromCart: 'removeCouponFromCart' },
): Promise<FetchResult<RemoveCouponFromCartMutation>> => {
  const { removeCouponFromCart: removeCouponFromCartGQL } = context.extendQuery(
    customQuery,
    {
      removeCouponFromCart: {
        query: removeCouponFromCart,
        variables: { input },
      },
    },
  );

  return context.client.mutate<RemoveCouponFromCartMutation, RemoveCouponFromCartMutationVariables>({
    mutation: removeCouponFromCartGQL.query,
    variables: removeCouponFromCartGQL.variables,
  });
};
