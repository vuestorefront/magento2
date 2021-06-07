import { FetchResult } from '@apollo/client';
import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  CustomerCreateInput,
} from '../../types/GraphQL';
import mutation from './mutation.graphql';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CustomerCreateInput,
): Promise<FetchResult<CreateCustomerMutation>> => context
  .client
  .mutate<CreateCustomerMutation, CreateCustomerMutationVariables>({
  mutation,
  variables: { input },
  fetchPolicy: 'no-cache',
});
