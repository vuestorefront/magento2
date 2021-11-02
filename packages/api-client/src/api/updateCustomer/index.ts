import { FetchResult } from '@apollo/client';
import updateCustomer from './updateCustomer';
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
  mutation: updateCustomer,
  variables: { input },
});
