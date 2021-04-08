import { ExecutionResult } from 'graphql';
import SetShippingAddressesOnCart from './mutation';
import {
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartOutput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

const setShippingAddressesOnCart = async ({ client }: Context, input: SetShippingAddressesOnCartInput):
Promise<ExecutionResult<SetShippingAddressesOnCartOutput>> => client.mutate({
  mutation: SetShippingAddressesOnCart,
  variables: { input },
});

export default setShippingAddressesOnCart;
