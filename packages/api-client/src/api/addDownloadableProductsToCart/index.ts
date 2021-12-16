import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import addDownloadableProductsToCart from './addDownloadableProductsToCart';
import {
  AddDownloadableProductsToCartInput,
  AddDownloadableProductsToCartMutation,
  AddDownloadableProductsToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: AddDownloadableProductsToCartInput,
  customQuery: CustomQuery = { addDownloadableProductsToCart: 'addDownloadableProductsToCart' },
): Promise<FetchResult<AddDownloadableProductsToCartMutation>> => {
  const { addDownloadableProductsToCart: addDownloadableProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addDownloadableProductsToCart: {
        query: addDownloadableProductsToCart,
        variables: { input },
      },
    },
  );
  return context.client.mutate<AddDownloadableProductsToCartMutation, AddDownloadableProductsToCartMutationVariables>({
    mutation: addDownloadableProductsToCartGQL.query,
    variables: { input },
  });
};
