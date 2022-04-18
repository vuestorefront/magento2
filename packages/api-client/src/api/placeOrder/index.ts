import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import placeOrderMutation from './placeOrder';
import { PlaceOrderInput, PlaceOrderMutation, PlaceOrderMutationVariables } from '../../types/GraphQL';
import { Context } from '../../types/context';

/**
 * Places an order for received cart.
 *
 * @param context VSF Context
 * @param input the order's input, containing the cart's ID
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 */
export default async function placeOrder(
  context: Context,
  input: PlaceOrderInput,
  customQuery: CustomQuery = { placeOrder: 'placeOrder' },
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
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
