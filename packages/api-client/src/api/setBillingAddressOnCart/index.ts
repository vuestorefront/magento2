import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartMutation,
  SetBillingAddressOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: SetBillingAddressOnCartInput,
): Promise<FetchResult<SetBillingAddressOnCartMutation>> => client
  .mutate<
SetBillingAddressOnCartMutation,
SetBillingAddressOnCartMutationVariables>({
  mutation,
  variables: { input },
});
