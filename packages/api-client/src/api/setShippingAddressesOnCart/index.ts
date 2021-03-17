import SetShippingAddressesOnCart from './mutation';
import { ExecutionResult } from 'graphql';
import {
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartOutput
} from '../../types/GraphQL';

const setShippingAddressesOnCart = async ({ client }, input: SetShippingAddressesOnCartInput): Promise<ExecutionResult<SetShippingAddressesOnCartOutput>> => {
  return await client.mutate({
    mutation: SetShippingAddressesOnCart,
    variables: { input }
  });
};

export default setShippingAddressesOnCart;
