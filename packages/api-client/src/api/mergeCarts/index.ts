import MergeCarts from './mutation';
import { ExecutionResult } from 'graphql';
import { Cart } from '../../types/GraphQL';

const mergeCarts = async ({ client }, sourceCartId: string, destinationCartId: string): Promise<ExecutionResult<Cart>> => {
  const response = client.mutate({
    mutation: MergeCarts,
    variables: {
      // eslint-disable-next-line @typescript-eslint/camelcase,camelcase
      source_cart_id: sourceCartId,
      // eslint-disable-next-line @typescript-eslint/camelcase,camelcase
      destination_cart_id: destinationCartId
    }
  });

  return response;
};

export default mergeCarts;
