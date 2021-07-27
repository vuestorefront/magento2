import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
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
  mutation,
  variables: input,
});
