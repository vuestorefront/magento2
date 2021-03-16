import UpdateCartItems from './mutation';
import { ExecutionResult } from 'graphql';
import { UpdateCartItemsInput, UpdateCartItemsOutput } from '../../types/GraphQL';

const updateCartItems = async ({ client }, input: UpdateCartItemsInput): Promise<ExecutionResult<UpdateCartItemsOutput>> => {
  return await client.mutate({
    mutation: UpdateCartItems,
    variables: { input }
  });
};

export default updateCartItems;
