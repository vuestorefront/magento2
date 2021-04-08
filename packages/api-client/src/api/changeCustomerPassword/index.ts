import changeCustomerPasswordMutation from './mutation';
import { Customer } from '../../types/GraphQL';
import { Context } from '../../types/context';

const changeCustomerPassword = async ({ client }: Context, currentPassword: string, newPassword: string): Promise<Customer> => {
  const { data } = await client.mutate({
    mutation: changeCustomerPasswordMutation,
    variables: {
      currentPassword,
      newPassword,
    },
    fetchPolicy: 'no-cache',
  });
  return data.changeCustomerPassword;
};

export default changeCustomerPassword;
