import { Customer, CustomerInput } from '../../types/GraphQL';
import createCustomerMutation from './mutation';

const createCustomer = async ({ client }, input: CustomerInput): Promise<Customer> => {
  const response = await client.mutate({
    mutation: createCustomerMutation,
    variables: { input },
    fetchPolicy: 'no-cache'
  });
  return response.data.createCustomer.customer;
};

export default createCustomer;
