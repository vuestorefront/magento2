import SetPaymentMethodOnCart from './mutation';
import { ExecutionResult } from 'graphql';
import {
  SetPaymentMethodOnCartInput,
  SetPaymentMethodOnCartOutput
} from '../../types/GraphQL';

const setPaymentMethodOnCart = async ({ client }, input: SetPaymentMethodOnCartInput): Promise<ExecutionResult<SetPaymentMethodOnCartOutput>> => {
  return await client.mutate({
    mutation: SetPaymentMethodOnCart,
    variables: { input }
  });
};

export default setPaymentMethodOnCart;
