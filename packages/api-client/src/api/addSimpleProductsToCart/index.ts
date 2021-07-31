import { FetchResult } from '@apollo/client';
import addSimpleProductsToCart from './addSimpleProductsToCart';
import {
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AddSimpleProductsToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: AddSimpleProductsToCartInput,
): Promise<FetchResult<AddSimpleProductsToCartMutation>> => client
  .mutate<AddSimpleProductsToCartMutation, AddSimpleProductsToCartMutationVariables>({
  mutation: addSimpleProductsToCart,
  variables: { input },
});
