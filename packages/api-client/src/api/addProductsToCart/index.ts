import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  MutationAddProductsToCartArgs,
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: MutationAddProductsToCartArgs,
): Promise<FetchResult<AddProductsToCartMutation>> => client
  .mutate<AddProductsToCartMutation, AddProductsToCartMutationVariables>({
  mutation,
  variables: { input },
});
