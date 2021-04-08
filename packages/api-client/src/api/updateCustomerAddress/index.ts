import { ExecutionResult } from 'graphql';
import UpdateCustomerAddress from './mutation';
import {
  CustomerAddressInput,
  CustomerAddress,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

const updateCustomerAddress = async ({ client }: Context, input: CustomerAddressInput): Promise<ExecutionResult<CustomerAddress>> => client.mutate({
  mutation: UpdateCustomerAddress,
  variables: { input },
});

export default updateCustomerAddress;
