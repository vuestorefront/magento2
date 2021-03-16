import changeCustomerPasswordMutation from './mutation';
import { Customer } from '../../types/GraphQL';

const changeCustomerPassword = async({ client }, currentPassword: string, newPassword: string): Promise<Customer> => {
  const response = client.mutate({
    mutation: changeCustomerPasswordMutation,
    variables: {
      currentPassword,
      newPassword
    },
    fetchPolicy: 'no-cache'
  });
  return response.data.changeCustomerPassword;
};

export default changeCustomerPassword;
