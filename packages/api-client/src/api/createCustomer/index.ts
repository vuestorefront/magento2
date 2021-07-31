import { FetchResult } from '@apollo/client';
import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  CustomerCreateInput,
} from '../../types/GraphQL';
import createCustomer from './createCustomer';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CustomerCreateInput,
): Promise<FetchResult<CreateCustomerMutation>> => context
  .client
  .mutate<CreateCustomerMutation, CreateCustomerMutationVariables>({
  mutation: createCustomer,
  variables: { input },
  fetchPolicy: 'no-cache',
});
