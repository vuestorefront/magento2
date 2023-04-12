import type { FetchResult } from '@apollo/client/core';
import type {
  CustomHeaders,
  CustomQuery,
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartMutation,
  SetShippingMethodsOnCartMutationVariables,
} from '@vsf-enterprise/magento-api-types';
import setShippingMethodsOnCartMutation from './setShippingMethodsOnCart';
import type { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Sets a shipping method on received cart.
 *
 * @param context VSF context
 * @param input params with cart ID and shipping method.
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function setShippingMethodsOnCart(
  context: Context,
  input: SetShippingMethodsOnCartInput,
  customQuery: CustomQuery = { setShippingMethodsOnCart: 'setShippingMethodsOnCart' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<SetShippingMethodsOnCartMutation>> {
  const { setShippingMethodsOnCart: setShippingMethodsOnCartGQL } = context.extendQuery(customQuery, {
    setShippingMethodsOnCart: {
      query: setShippingMethodsOnCartMutation,
      variables: { input },
    },
  });

  return context.client.mutate<SetShippingMethodsOnCartMutation, SetShippingMethodsOnCartMutationVariables>({
    mutation: setShippingMethodsOnCartGQL.query,
    variables: setShippingMethodsOnCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
