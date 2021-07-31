import { FetchResult } from '@apollo/client';
import addProductsToWishlist from './addProductsToWishlist';
import {
  AddProductsToWishlistMutation,
  AddProductsToWishlistMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: AddProductsToWishlistMutationVariables,
): Promise<FetchResult<AddProductsToWishlistMutation>> => client
  .mutate<AddProductsToWishlistMutation, AddProductsToWishlistMutationVariables>({
  mutation: addProductsToWishlist,
  variables: input,
});
