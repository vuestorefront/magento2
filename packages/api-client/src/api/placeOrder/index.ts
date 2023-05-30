import { FetchResult } from '@apollo/client/core';
import type { CustomHeaders } from '@vue-storefront/magento-types';
import { PlaceOrderInput, PlaceOrderMutation, PlaceOrderMutationVariables } from '@vue-storefront/magento-types';
import gql from 'graphql-tag';
import placeOrderMutation from './placeOrder';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Places an order for received cart.
 *
 * @param context VSF Context
 * @param input the order's input, containing the cart's ID
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function placeOrder(
  context: Context,
  input: PlaceOrderInput,
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<PlaceOrderMutation>> {
  try {
    return await context.client.mutate<PlaceOrderMutation, PlaceOrderMutationVariables>({
      mutation: gql`${placeOrderMutation}`,
      variables: { input },
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
