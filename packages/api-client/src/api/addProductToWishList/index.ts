import { FetchResult, gql } from '@apollo/client/core';
import {
  CustomQuery,
  AddProductsToWishlistMutation,
  AddProductsToWishlistMutationVariables,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import addProductsToWishlist from './addProductsToWishlist';
import { Context } from '../../types/context';
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
    mutation: gql`${addProductsToWishlistGQL.query}`,
    variables: addProductsToWishlistGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
