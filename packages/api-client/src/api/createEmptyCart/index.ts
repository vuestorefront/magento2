import { ExecutionResult } from 'graphql';
import { CreateEmptyCartMutation } from '../../types/GraphQL';
import CreateCartMutation from './mutation';
import { Context } from '../../types/context';

const createEmptyCart = async ({ client }: Context): Promise<ExecutionResult<CreateEmptyCartMutation>> => client.mutate({
  mutation: CreateCartMutation,
});

export default createEmptyCart;
