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

/**
 * Sets received payment method on cart.
 *
 * @param context VSF context
 * @param input params containing the cart's ID and the payment method
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 */
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
    variables: setPaymentMethodOnCartGQL.variables,
  });
};
