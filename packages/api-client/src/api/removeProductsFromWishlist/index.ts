import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import removeProductsFromWishlist from './removeProductsFromWishlist';
import {
  RemoveProductsFromWishlistMutation,
  RemoveProductsFromWishlistMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  input: RemoveProductsFromWishlistMutationVariables,
  customQuery: CustomQuery = { removeProductsFromWishlist: 'removeProductsFromWishlist' },
): Promise<FetchResult<RemoveProductsFromWishlistMutation>> => {
  const { removeProductsFromWishlist: removeProductsFromWishlistGQL } = context.extendQuery(
    customQuery,
    {
      removeProductsFromWishlist: {
        query: removeProductsFromWishlist,
        variables: { ...input },
      },
    },
  );

  return context.client.mutate<RemoveProductsFromWishlistMutation, RemoveProductsFromWishlistMutationVariables>({
    mutation: removeProductsFromWishlistGQL.query,
    variables: removeProductsFromWishlistGQL.variables,
    context: {
      headers: getHeaders(context),
    },
  });
};
