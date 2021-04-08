import { ExecutionResult } from 'graphql';
import UpdateCartItems from './mutation';
import { UpdateCartItemsInput, UpdateCartItemsOutput } from '../../types/GraphQL';
import { Context } from '../../types/context';

const updateCartItems = async ({ client }: Context, input: UpdateCartItemsInput):
Promise<ExecutionResult<UpdateCartItemsOutput>> => client.mutate({
  mutation: UpdateCartItems,
  variables: { input },
});

export default updateCartItems;
