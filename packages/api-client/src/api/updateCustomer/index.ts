import updateCustomerMutation from './mutation';
import { Customer, CustomerInput } from '../../types/GraphQL';
import { Context } from '../../types/context';

const updateCustomer = async ({ client }: Context, input: CustomerInput): Promise<Customer> => {
  const { data } = await client.mutate({
    mutation: updateCustomerMutation,
    variables: { input },
    fetchPolicy: 'no-cache',
  });
  return data.updateCustomer.customer;
};

export default updateCustomer;
