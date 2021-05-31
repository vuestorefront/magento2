import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  SetPaymentMethodOnCartInput,
  SetPaymentMethodOnCartMutation,
  SetPaymentMethodOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export interface SetPaymentMethodOnCartInputs extends SetPaymentMethodOnCartInput {
  [k: string]: any;
}

export default async (
  { client }: Context,
  input: SetPaymentMethodOnCartInputs,
): Promise<FetchResult<SetPaymentMethodOnCartMutation>> => client
  .mutate<
SetPaymentMethodOnCartMutation,
SetPaymentMethodOnCartMutationVariables>({
  mutation,
  variables: { input },
});
