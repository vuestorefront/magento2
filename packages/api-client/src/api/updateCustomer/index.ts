import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  CustomerUpdateInput,
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async ({ client }: Context, input: CustomerUpdateInput): Promise<FetchResult<UpdateCustomerMutation>> => client
  .mutate<
UpdateCustomerMutation,
UpdateCustomerMutationVariables>({
  mutation,
  variables: { input },
  fetchPolicy: 'no-cache',
});
