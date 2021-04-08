import { ExecutionResult } from 'graphql';
import ApplyCouponToCart from './mutation';
import { ApplyCouponToCartInput, ApplyCouponToCartOutput } from '../../types/GraphQL';
import { Context } from '../../types/context';

const applyCouponToCart = async ({ client }: Context, input: ApplyCouponToCartInput): Promise<ExecutionResult<ApplyCouponToCartOutput>> => client.mutate({
  mutation: ApplyCouponToCart,
  variables: { input },
});

export default applyCouponToCart;
