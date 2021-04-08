import { ExecutionResult } from 'graphql';
import AddConfigurableProductsToCart from './mutation';
import { AddConfigurableProductsToCartInput, AddConfigurableProductsToCartOutput } from '../../types/GraphQL';
import { Context } from '../../types/context';

const addConfigurableProductsToCart = async ({ client }: Context, input: AddConfigurableProductsToCartInput): Promise<ExecutionResult<AddConfigurableProductsToCartOutput>> => client.mutate({
  mutation: AddConfigurableProductsToCart,
  variables: { input },
});

export default addConfigurableProductsToCart;
