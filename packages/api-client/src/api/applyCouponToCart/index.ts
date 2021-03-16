import ApplyCouponToCart from './mutation';
import { ExecutionResult } from 'graphql';
import { ApplyCouponToCartInput, ApplyCouponToCartOutput } from '../../types/GraphQL';

const applyCouponToCart = async ({ client }, input: ApplyCouponToCartInput): Promise<ExecutionResult<ApplyCouponToCartOutput>>=> {
  return await client.mutate({
    mutation: ApplyCouponToCart,
    variables: { input }
  });
};

export default applyCouponToCart;
