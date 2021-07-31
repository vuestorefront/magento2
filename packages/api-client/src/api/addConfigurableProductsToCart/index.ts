import { FetchResult } from '@apollo/client';
import addConfigurableProductsToCart from './addConfigurableProductsToCart';
import {
  AddConfigurableProductsToCartMutationVariables,
  AddConfigurableProductsToCartMutation,
  AddConfigurableProductsToCartInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: AddConfigurableProductsToCartInput,
): Promise<FetchResult<AddConfigurableProductsToCartMutation>> => client
  .mutate<any, AddConfigurableProductsToCartMutationVariables>({
  mutation: addConfigurableProductsToCart,
  variables: { input },
});
