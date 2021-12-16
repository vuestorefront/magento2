import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import setPaymentMethodOnCart from './setPaymentMethodOnCart';
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
  context: Context,
  input: SetPaymentMethodOnCartInputs,
  customQuery: CustomQuery = { setPaymentMethodOnCart: 'setPaymentMethodOnCart' },
): Promise<FetchResult<SetPaymentMethodOnCartMutation>> => {
  const { setPaymentMethodOnCart: setPaymentMethodOnCartGQL } = context.extendQuery(
    customQuery,
    {
      setPaymentMethodOnCart: {
        query: setPaymentMethodOnCart,
        variables: { input },
      },
    },
  );

  return context.client.mutate<SetPaymentMethodOnCartMutation, SetPaymentMethodOnCartMutationVariables>({
    mutation: setPaymentMethodOnCartGQL.query,
    variables: { input },
  });
};
