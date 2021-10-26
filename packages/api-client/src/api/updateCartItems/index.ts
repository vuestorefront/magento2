import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import updateCartItems from './updateCartItems';
import {
  UpdateCartItemsInput,
  UpdateCartItemsMutation,
  UpdateCartItemsMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: UpdateCartItemsInput,
  customQuery: CustomQuery = { updateCartItems: 'updateCartItems' },
): Promise<FetchResult<UpdateCartItemsMutation>> => {
  const { updateCartItems: updateCartItemsGQL } = context.extendQuery(
    customQuery,
    {
      updateCartItems: {
        query: updateCartItems,
        variables: { input },
      },
    },
  );

  return context.client.mutate<UpdateCartItemsMutation, UpdateCartItemsMutationVariables>({
    mutation: updateCartItemsGQL.query,
    variables: updateCartItemsGQL.variables,
  });
};
