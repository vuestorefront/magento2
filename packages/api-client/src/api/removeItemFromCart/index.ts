import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import removeItemFromCart from './removeItemFromCart';
import {
  RemoveItemFromCartInput,
  RemoveItemFromCartMutation,
  RemoveItemFromCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: RemoveItemFromCartInput,
  customQuery: CustomQuery = { removeItemFromCart: 'removeItemFromCart' },
): Promise<FetchResult<RemoveItemFromCartMutation>> => {
  const { removeItemFromCart: removeItemFromCartGQL } = context.extendQuery(
    customQuery,
    {
      removeItemFromCart: {
        query: removeItemFromCart,
        variables: { input },
      },
    },
  );

  return context.client.mutate<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>({
    mutation: removeItemFromCartGQL.query,
    variables: removeItemFromCartGQL.variables,
    errorPolicy: 'all',
  });
};
