import ApplyCouponToCart from './mutation';
import { ExecutionResult } from 'graphql';
import { AddSimpleProductsToCartInput, AddSimpleProductsToCartOutput } from '../../types/GraphQL';

const addSimpleProductsToCart = async ({ client }, input: AddSimpleProductsToCartInput): Promise<ExecutionResult<AddSimpleProductsToCartOutput>> => {
  return await client.mutate({
    mutation: ApplyCouponToCart,
    variables: { input }
  });
};

export default addSimpleProductsToCart;
