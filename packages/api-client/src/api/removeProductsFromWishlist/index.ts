import { FetchResult } from '@apollo/client/core';
import type { CustomHeaders } from '@vue-storefront/magento-api-types';
import { CustomQuery, RemoveProductsFromWishlistMutation, RemoveProductsFromWishlistMutationVariables } from '@vue-storefront/magento-api-types';
import gql from 'graphql-tag';
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
    mutation: gql`${removeProductsFromWishlistGQL.query}`,
    variables: removeProductsFromWishlistGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
