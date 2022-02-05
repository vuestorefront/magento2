import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import setPaymentMethodAndPlaceOrderQuery from './setPaymentMethodAndPlaceOrder';
import {
  PlaceOrderInput,
  PlaceOrderMutation,
  SetPaymentMethodOnCartMutation,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import { SetPaymentMethodOnCartInputs } from '../setPaymentMethodOnCart'

export interface SetPaymentMethodAndPlaceOrderVariables {
  setPaymentMethod: SetPaymentMethodOnCartInputs;
  placeOrder: PlaceOrderInput;
}

export default async (
  context: Context,
  input: SetPaymentMethodAndPlaceOrderVariables,
  customQuery: CustomQuery = { setPaymentMethodAndPlaceOrder: 'setPaymentMethodAndPlaceOrder' },
): Promise<FetchResult<SetPaymentMethodOnCartMutation & PlaceOrderMutation>> => {
  const { setPaymentMethodAndPlaceOrder } = context.extendQuery(customQuery, {
    setPaymentMethodAndPlaceOrder: {
      query: setPaymentMethodAndPlaceOrderQuery,
      variables: input,
    },
  });

  return await context.client.mutate<PlaceOrderMutation, SetPaymentMethodAndPlaceOrderVariables>({
    mutation: setPaymentMethodAndPlaceOrder.query,
    variables: setPaymentMethodAndPlaceOrder.variables,
  });
};
