
import GenerateCustomerToken from './mutation';
import { ExecutionResult } from 'graphql';
import { CustomerToken } from '../../types/GraphQL';

const generateCustomerToken = async ({ client }, email: string, password: string): Promise<ExecutionResult<CustomerToken>> => {
  const response = client.mutate({
    mutation: GenerateCustomerToken,
    variables: {
      email,
      password
    },
    fetchPolicy: 'no-cache'
  });

  return response;
  // return response.data.changeCustomerPassword;
};

export default generateCustomerToken;
