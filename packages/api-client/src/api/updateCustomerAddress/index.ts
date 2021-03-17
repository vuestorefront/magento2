import UpdateCustomerAddress from './mutation';
import { ExecutionResult } from 'graphql';
import {
  CustomerAddressInput,
  CustomerAddress
} from '../../types/GraphQL';

const updateCustomerAddress = async ({ client }, input: CustomerAddressInput): Promise<ExecutionResult<CustomerAddress>> => {
  return await client.mutate({
    mutation: UpdateCustomerAddress,
    variables: { input }
  });
};

export default updateCustomerAddress;
