import SetShippingMethodsOnCart from './mutation';
import { ExecutionResult } from 'graphql';
import {
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartOutput
} from '../../types/GraphQL';

const setShippingMethodsOnCart = async ({ client }, input: SetShippingMethodsOnCartInput): Promise<ExecutionResult<SetShippingMethodsOnCartOutput>> => {
  return await client.mutate({
    mutation: SetShippingMethodsOnCart,
    variables: { input }
  });
};

export default setShippingMethodsOnCart;
