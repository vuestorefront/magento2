import { ExecutionResult } from 'graphql';
import PlaceOrder from './mutation';
import {
  PlaceOrderInput,
  PlaceOrderOutput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

const placeOrder = async ({ client }: Context, input: PlaceOrderInput): Promise<ExecutionResult<PlaceOrderOutput>> => client.mutate({
  mutation: PlaceOrder,
  variables: { input },
});

export default placeOrder;
