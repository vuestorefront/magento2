import { ExecutionResult } from 'graphql';
import SetBillingAddressOnCart from './mutation';
import {
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartOutput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

const setBillingAddressOnCart = async ({ client }: Context, input: SetBillingAddressOnCartInput):
Promise<ExecutionResult<SetBillingAddressOnCartOutput>> => client.mutate({
  mutation: SetBillingAddressOnCart,
  variables: { input },
});

export default setBillingAddressOnCart;
