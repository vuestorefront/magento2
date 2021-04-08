import { ExecutionResult } from 'graphql';
import SetPaymentMethodOnCart from './mutation';
import {
  SetPaymentMethodOnCartInput,
  SetPaymentMethodOnCartOutput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

const setPaymentMethodOnCart = async ({ client }: Context, input: SetPaymentMethodOnCartInput):
Promise<ExecutionResult<SetPaymentMethodOnCartOutput>> => client.mutate({
  mutation: SetPaymentMethodOnCart,
  variables: { input },
});

export default setPaymentMethodOnCart;
