import mutation from './mutation.graphql';
import {
  CustomerFragmentFragment as Customer,
  CustomerInput,
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async ({ client }: Context, input: CustomerInput): Promise<Customer> => {
  const { data } = await client
    .mutate<
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables>({
    mutation,
    variables: { input },
    fetchPolicy: 'no-cache',
  });

  return data?.updateCustomer?.customer;
};
