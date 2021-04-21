import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  SetPaymentMethodOnCartInput,
  SetPaymentMethodOnCartMutation,
  SetPaymentMethodOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: SetPaymentMethodOnCartInput,
): Promise<FetchResult<SetPaymentMethodOnCartMutation>> => client
  .mutate<
SetPaymentMethodOnCartMutation,
SetPaymentMethodOnCartMutationVariables>({
  mutation,
  variables: { input },
});
