import { FetchResult } from '@apollo/client';
import removeCouponFromCart from './removeCouponFromCart';
import {
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
  RemoveCouponFromCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: RemoveCouponFromCartInput,
): Promise<FetchResult<RemoveCouponFromCartMutation>> => client
  .mutate<RemoveCouponFromCartMutation, RemoveCouponFromCartMutationVariables>({
  mutation: removeCouponFromCart,
  variables: { input },
});
