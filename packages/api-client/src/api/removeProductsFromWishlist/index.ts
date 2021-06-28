import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  RemoveProductsFromWishlistMutation,
  RemoveProductsFromWishlistMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: RemoveProductsFromWishlistMutationVariables,
): Promise<FetchResult<RemoveProductsFromWishlistMutation>> => client
  .mutate<RemoveProductsFromWishlistMutation, RemoveProductsFromWishlistMutationVariables>({
  mutation,
  variables: input,
});
