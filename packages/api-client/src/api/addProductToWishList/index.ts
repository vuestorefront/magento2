import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import addProductsToWishlist from './addProductsToWishlist';
import {
  AddProductsToWishlistMutation,
  AddProductsToWishlistMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: AddProductsToWishlistMutationVariables,
  customQuery: CustomQuery = { addProductsToWishlist: 'addProductsToWishlist' },
): Promise<FetchResult<AddProductsToWishlistMutation>> => {
  const { addProductsToWishlist: addProductsToWishlistGQL } = context.extendQuery(
    customQuery,
    {
      addProductsToWishlist: {
        query: addProductsToWishlist,
        variables: { input },
      },
    },
  );
  return context.client.mutate<AddProductsToWishlistMutation, AddProductsToWishlistMutationVariables>({
    mutation: addProductsToWishlistGQL.query,
    variables: input,
  });
};
