import { FetchResult } from '@apollo/client/core';
import {
  CustomQuery, PlaceOrderInput, PlaceOrderMutation, PlaceOrderMutationVariables,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import placeOrderMutation from './placeOrder';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Places an order for received cart.
 *
 * @param context VSF Context
 * @param input the order's input, containing the cart's ID
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function placeOrder(
  context: Context,
  input: PlaceOrderInput,
  customQuery: CustomQuery = { placeOrder: 'placeOrder' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<PlaceOrderMutation>> {
  const { placeOrder: placeOrderGQL } = context.extendQuery(customQuery, {
    placeOrder: {
      query: placeOrderMutation,
      variables: { input },
    },
  });

  try {
    return await context.client.mutate<PlaceOrderMutation, PlaceOrderMutationVariables>({
      mutation: placeOrderGQL.query,
      variables: placeOrderGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
