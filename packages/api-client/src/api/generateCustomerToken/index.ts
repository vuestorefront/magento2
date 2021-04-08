import { ExecutionResult } from 'graphql';
import GenerateCustomerToken from './mutation';
import { CustomerToken } from '../../types/GraphQL';
import { Context } from '../../types/context';

const generateCustomerToken = async ({ client }: Context, email: string, password: string): Promise<ExecutionResult<CustomerToken>> => client.mutate({
  mutation: GenerateCustomerToken,
  variables: {
    email,
    password,
  },
  fetchPolicy: 'no-cache',
});

export default generateCustomerToken;
