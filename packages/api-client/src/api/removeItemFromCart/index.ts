import RemoveItemFromCart from './mutation';
import { ExecutionResult } from 'graphql';
import { RemoveItemFromCartInput, RemoveItemFromCartOutput } from '../../types/GraphQL';

const removeItemFromCart = async ({ client }, input: RemoveItemFromCartInput): Promise<ExecutionResult<RemoveItemFromCartOutput>> => {
  const response = client.mutate({
    mutation: RemoveItemFromCart,
    variables: { input }
  });

  return response;
};

export default removeItemFromCart;
