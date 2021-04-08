import { ExecutionResult } from 'graphql';
import ApplyCouponToCart from './mutation';
import { AddSimpleProductsToCartInput, AddSimpleProductsToCartOutput } from '../../types/GraphQL';
import { Context } from '../../types/context';

const addSimpleProductsToCart = async ({ client }: Context, input: AddSimpleProductsToCartInput): Promise<ExecutionResult<AddSimpleProductsToCartOutput>> => client.mutate({
  mutation: ApplyCouponToCart,
  variables: { input },
});

export default addSimpleProductsToCart;
