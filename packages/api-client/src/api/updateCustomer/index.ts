import updateCustomerMutation from './mutation';
import { Customer, CustomerInput } from '../../types/GraphQL';

const updateCustomer = async({ client }, input: CustomerInput): Promise<Customer> => {
  const response = client.mutate({
    mutation: updateCustomerMutation,
    variables: { input },
    fetchPolicy: 'no-cache'
  });
  return response.data.updateCustomer.customer;
};

export default updateCustomer;
