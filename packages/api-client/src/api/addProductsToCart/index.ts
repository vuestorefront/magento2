import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  AddProductsToCartInput,
  AddProductsToCartMutation,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: AddProductsToCartInput,
): Promise<FetchResult<AddProductsToCartMutation>> => client
  .mutate<AddProductsToCartMutation, AddProductsToCartInput>({
  mutation,
  variables: input,
});
