import { FetchResult } from '@apollo/client';
import addDownloadableProductsToCart from './addDownloadableProductsToCart';
import {
  AddDownloadableProductsToCartInput,
  AddDownloadableProductsToCartMutation,
  AddDownloadableProductsToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: AddDownloadableProductsToCartInput,
): Promise<FetchResult<AddDownloadableProductsToCartMutation>> => client
  .mutate<AddDownloadableProductsToCartMutation, AddDownloadableProductsToCartMutationVariables>({
  mutation: addDownloadableProductsToCart,
  variables: { input },
});
