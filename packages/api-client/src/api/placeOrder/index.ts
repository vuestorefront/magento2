import PlaceOrder from './mutation';
import { ExecutionResult } from 'graphql';
import {
  PlaceOrderInput,
  PlaceOrderOutput
} from '../../types/GraphQL';

const placeOrder = async ({ client }, input: PlaceOrderInput): Promise<ExecutionResult<PlaceOrderOutput>> => {
  return await client.mutate({
    mutation: PlaceOrder,
    variables: { input }
  });
};

export default placeOrder;
