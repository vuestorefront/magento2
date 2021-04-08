import { ExecutionResult } from 'graphql';
import RemoveItemFromCart from './mutation';
import { RemoveItemFromCartInput, RemoveItemFromCartOutput } from '../../types/GraphQL';
import { Context } from '../../types/context';

const removeItemFromCart = async ({ client }: Context, input: RemoveItemFromCartInput):
Promise<ExecutionResult<RemoveItemFromCartOutput>> => client.mutate({
  mutation: RemoveItemFromCart,
  variables: { input },
});

export default removeItemFromCart;
