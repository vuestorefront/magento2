import { ExecutionResult } from 'graphql';
import CreateCustomerAddress from './mutation';
import {
  CustomerAddressInput,
  CustomerAddress,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

const createCustomerAddress = async ({ client }: Context, input: CustomerAddressInput): Promise<ExecutionResult<CustomerAddress>> => client.mutate({
  mutation: CreateCustomerAddress,
  variables: { input },
});

export default createCustomerAddress;
