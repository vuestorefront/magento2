import AddConfigurableProductsToCart from './mutation';
import { ExecutionResult } from 'graphql';
import { AddConfigurableProductsToCartInput, AddConfigurableProductsToCartOutput } from '../../types/GraphQL';

const addConfigurableProductsToCart = async ({ client }, input: AddConfigurableProductsToCartInput): Promise<ExecutionResult<AddConfigurableProductsToCartOutput>> => {
  return await client.mutate({
    mutation: AddConfigurableProductsToCart,
    variables: { input }
  });
};

export default addConfigurableProductsToCart;
