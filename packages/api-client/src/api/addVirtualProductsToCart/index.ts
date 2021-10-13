import { FetchResult } from '@apollo/client';
import addVirtualProductsToCart from './addVirtualProductsToCart';
import {
  AddVirtualProductsToCartInput,
  AddVirtualProductsToCartMutation,
  AddVirtualProductsToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: AddVirtualProductsToCartInput,
): Promise<FetchResult<AddVirtualProductsToCartMutation>> => client
  .mutate<AddVirtualProductsToCartMutation, AddVirtualProductsToCartMutationVariables>({
  mutation: addVirtualProductsToCart,
  variables: { input },
});
