import { FetchResult } from '@apollo/client';
import addBundleProductsToCart from './addBundleProductsToCart';
import {
  AddBundleProductsToCartMutation,
  AddBundleProductsToCartMutationVariables,
  AddBundleProductsToCartInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: AddBundleProductsToCartInput,
): Promise<FetchResult<AddBundleProductsToCartMutation>> => client
  .mutate<any, AddBundleProductsToCartMutationVariables>({
  mutation: addBundleProductsToCart,
  variables: { input },
});
