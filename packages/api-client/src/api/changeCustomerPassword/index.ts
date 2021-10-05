import changeCustomerPassword from './changeCustomerPassword';
import {
  ChangeCustomerPasswordMutation,
  ChangeCustomerPasswordMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  currentPassword: string,
  newPassword: string,
): Promise<ChangeCustomerPasswordMutation['changeCustomerPassword']> => {
  const { data } = await client
    .mutate<ChangeCustomerPasswordMutation, ChangeCustomerPasswordMutationVariables>({
    mutation: changeCustomerPassword,
    variables: {
      currentPassword,
      newPassword,
    },
    fetchPolicy: 'no-cache',
  });

  return data?.changeCustomerPassword;
};
