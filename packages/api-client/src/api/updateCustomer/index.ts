import mutation from './mutation.graphql';
import {
  CustomerDataFragment as Customer,
  CustomerUpdateInput,
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async ({ client }: Context, input: CustomerUpdateInput): Promise<Customer> => {
  const { data } = await client
    .mutate<
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables>({
    mutation,
    variables: { input },
    fetchPolicy: 'no-cache',
  });

  return data?.updateCustomerV2?.customer;
};
