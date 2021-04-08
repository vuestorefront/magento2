import { ExecutionResult } from 'graphql';
import SetShippingMethodsOnCart from './mutation';
import {
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartOutput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

const setShippingMethodsOnCart = async ({ client }: Context, input: SetShippingMethodsOnCartInput):
Promise<ExecutionResult<SetShippingMethodsOnCartOutput>> => client.mutate({
  mutation: SetShippingMethodsOnCart,
  variables: { input },
});

export default setShippingMethodsOnCart;
