import { createEmptyCartMutation } from '../../types/GraphQL';
import CreateCartMutation from './mutation';
import { ExecutionResult } from 'graphql';

const createEmptyCart = async ({ client }): Promise<ExecutionResult<createEmptyCartMutation>> => {

  return await client.mutate({
    mutation: CreateCartMutation
  });
};

export default createEmptyCart;
