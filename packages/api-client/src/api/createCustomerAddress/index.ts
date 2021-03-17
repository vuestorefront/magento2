import CreateCustomerAddress from './mutation';
import { ExecutionResult } from 'graphql';
import {
  CustomerAddressInput,
  CustomerAddress
} from '../../types/GraphQL';

const createCustomerAddress = async ({ client }, input: CustomerAddressInput): Promise<ExecutionResult<CustomerAddress>> => {
  return await client.mutate({
    mutation: CreateCustomerAddress,
    variables: { input }
  });
};

export default createCustomerAddress;
