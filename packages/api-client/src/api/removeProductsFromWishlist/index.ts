import { FetchResult } from '@apollo/client/core';
import {
  CustomQuery,
  RemoveProductsFromWishlistMutation,
  RemoveProductsFromWishlistMutationVariables,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import removeProductsFromWishlist from './removeProductsFromWishlist';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  input: RemoveProductsFromWishlistMutationVariables,
  customQuery: CustomQuery = { removeProductsFromWishlist: 'removeProductsFromWishlist' },
  customHeaders: CustomHeaders = {},
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
      headers: getHeaders(context, customHeaders),
    },
  });
};
