import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  CustomerDataFragment as Customer,
  CustomerInput,
} from '../../types/GraphQL';
import mutation from './mutation.graphql';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CustomerInput,
): Promise<Customer> => {
  const response = await context
    .client
    .mutate<CreateCustomerMutation, CreateCustomerMutationVariables>({
    mutation,
    variables: { input },
    fetchPolicy: 'no-cache',
  });

  const { data } = response;

  return data?.createCustomer?.customer;
};
