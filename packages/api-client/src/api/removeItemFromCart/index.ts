import { FetchResult } from '@apollo/client/core';
import type { CustomQuery } from '@vue-storefront/core';
import type { Context } from '../../types/context';
import {
  RemoveItemFromCartInput,
  RemoveItemFromCartMutation,
  RemoveItemFromCartMutationVariables,
} from '../../types/GraphQL';
import removeItemFromCartMutation from './removeItemFromCart';

/**
 * Removes an item from the given cart
 * @param context VSF context
 * @param input ID of the cart and item to be removed from it
 * @param customQuery custom GraphQL query that extends the default one
 */
export default async function removeItemFromCart(
  context: Context,
  input: RemoveItemFromCartInput,
  customQuery: CustomQuery = { removeItemFromCart: 'removeItemFromCart' },
): Promise<FetchResult<RemoveItemFromCartMutation>> {
  const { removeItemFromCart: removeItemFromCartGQL } = context.extendQuery(
    customQuery,
    {
      removeItemFromCart: {
        query: removeItemFromCartMutation,
        variables: { input },
      },
    },
  );

  return context.client.mutate<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>({
    mutation: removeItemFromCartGQL.query,
    variables: removeItemFromCartGQL.variables,
  });
}
