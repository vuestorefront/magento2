import SetBillingAddressOnCart from './mutation';
import { ExecutionResult } from 'graphql';
import {
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartOutput
} from '../../types/GraphQL';

const setBillingAddressOnCart = async ({ client }, input: SetBillingAddressOnCartInput): Promise<ExecutionResult<SetBillingAddressOnCartOutput>> => {
  return await client.mutate({
    mutation: SetBillingAddressOnCart,
    variables: { input }
  });
};

export default setBillingAddressOnCart;
