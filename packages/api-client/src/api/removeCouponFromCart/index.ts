import { ExecutionResult } from 'graphql';
import ApplyCouponToCart from './mutation';
import { RemoveCouponFromCartInput, RemoveCouponFromCartOutput } from '../../types/GraphQL';
import { Context } from '../../types/context';

const removeCouponFromCart = async ({ client }: Context, input: RemoveCouponFromCartInput):
Promise<ExecutionResult<RemoveCouponFromCartOutput>> => client.mutate({
  mutation: ApplyCouponToCart,
  variables: { input },
});

export default removeCouponFromCart;
