import { Customer, CustomerInput } from '../../types/GraphQL';
import createCustomerMutation from './mutation';
import { Context } from '../../types/context';

const createCustomer = async ({ client }: Context, input: CustomerInput): Promise<Customer> => {
  const { data } = await client.mutate({
    mutation: createCustomerMutation,
    variables: { input },
    fetchPolicy: 'no-cache',
  });
  return data.createCustomer.customer;
};

export default createCustomer;
