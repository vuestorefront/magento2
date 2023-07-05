import { FetchResult } from '@apollo/client/core';
import type {
  CustomHeaders,
  SetPaymentMethodOnCartInputs,
  SetPaymentMethodOnCartMutation,
  SetPaymentMethodOnCartMutationVariables,
} from '@vue-storefront/magento-types';
import { CustomQuery } from '@vue-storefront/magento-types';

import gql from 'graphql-tag';
import setPaymentMethodOnCartMutation from './setPaymentMethodOnCart';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Sets received payment method on cart.
 *
 * @param context VSF context
 * @param input params containing the cart's ID and the payment method
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function setPaymentMethodOnCart(
  context: Context,
  input: SetPaymentMethodOnCartInputs,
  customQuery: CustomQuery = { setPaymentMethodOnCart: 'setPaymentMethodOnCart' },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<SetPaymentMethodOnCartMutation>> {
  const { setPaymentMethodOnCart: setPaymentMethodOnCartGQL } = context.extendQuery(customQuery, {
    setPaymentMethodOnCart: {
      query: setPaymentMethodOnCartMutation,
      variables: { input },
    },
  });

  return context.client.mutate<SetPaymentMethodOnCartMutation, SetPaymentMethodOnCartMutationVariables>({
    mutation: gql`
      ${setPaymentMethodOnCartGQL.query}
    `,
    variables: setPaymentMethodOnCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
