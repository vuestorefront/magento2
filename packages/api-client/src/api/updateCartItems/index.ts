import { FetchResult } from '@apollo/client/core';
import type { CustomQuery } from '@vue-storefront/middleware';
import type { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import {
  UpdateCartItemsInput,
  UpdateCartItemsMutation,
  UpdateCartItemsMutationVariables,
} from '../../types/GraphQL';
import updateCartItemsMutation from './updateCartItems';
import getHeaders from '../getHeaders';

/**
 * Updates the contents of the given cart
 * @param context VSF context
 * @param input ID of the cart and the items to update it
 * @param customQuery custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function updateCartItems(
  context: Context,
  input: UpdateCartItemsInput,
  customQuery: CustomQuery = { updateCartItems: 'updateCartItems' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<UpdateCartItemsMutation>> {
  const { updateCartItems: updateCartItemsGQL } = context.extendQuery(
    customQuery,
    {
      updateCartItems: {
        query: updateCartItemsMutation,
        variables: { input },
      },
    },
  );

  return context.client.mutate<UpdateCartItemsMutation, UpdateCartItemsMutationVariables>({
    mutation: updateCartItemsGQL.query,
    variables: updateCartItemsGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
