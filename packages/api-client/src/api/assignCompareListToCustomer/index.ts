import { FetchResult } from '@apollo/client/core';
import assignCompareListToCustomer from './assignCompareListToCustomer';
import {
  AssignCompareListToCustomerMutation,
  MutationAssignCompareListToCustomerArgs,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  uid: string,
): Promise<FetchResult<AssignCompareListToCustomerMutation>> => client
  .mutate<AssignCompareListToCustomerMutation, MutationAssignCompareListToCustomerArgs>({
  mutation: assignCompareListToCustomer,
  variables: { uid },
});
