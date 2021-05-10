import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  CustomerCreateInput,
  CustomerDataFragment as Customer,
} from '../../types/GraphQL';
import mutation from './mutation.graphql';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CustomerCreateInput,
): Promise<Customer> => {
  const response = await context
    .client
    .mutate<CreateCustomerMutation, CreateCustomerMutationVariables>({
    mutation,
    variables: { input },
    fetchPolicy: 'no-cache',
  });

  const { data } = response;

  return data?.createCustomerV2?.customer;
};
