import ApplyCouponToCart from './mutation';
import { ExecutionResult } from 'graphql';
import { RemoveCouponFromCartInput, RemoveCouponFromCartOutput } from '../../types/GraphQL';

const removeCouponFromCart = async ({ client }, input: RemoveCouponFromCartInput): Promise<ExecutionResult<RemoveCouponFromCartOutput>> => {
  return await client.mutate({
    mutation: ApplyCouponToCart,
    variables: { input }
  });
};

export default removeCouponFromCart;
