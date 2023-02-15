import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/middleware';
import addProductsToWishlist from './addProductsToWishlist';
import {
  AddProductsToWishlistMutation,
  AddProductsToWishlistMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  input: AddProductsToWishlistMutationVariables,
  customQuery: CustomQuery = { addProductsToWishlist: 'addProductsToWishlist' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<AddProductsToWishlistMutation>> => {
  const { addProductsToWishlist: addProductsToWishlistGQL } = context.extendQuery(
    customQuery,
    {
      addProductsToWishlist: {
        query: addProductsToWishlist,
        variables: { ...input },
      },
    },
  );
  return context.client.mutate<AddProductsToWishlistMutation, AddProductsToWishlistMutationVariables>({
    mutation: addProductsToWishlistGQL.query,
    variables: addProductsToWishlistGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
