import { ExecutionResult } from 'graphql';
import MergeCarts from './mutation';
import { Cart } from '../../types/GraphQL';
import { Context } from '../../types/context';

const mergeCarts = async ({ client }: Context, sourceCartId: string, destinationCartId: string): Promise<ExecutionResult<Cart>> => client.mutate({
  mutation: MergeCarts,
  variables: {
    source_cart_id: sourceCartId,
    destination_cart_id: destinationCartId,
  },
});

export default mergeCarts;
