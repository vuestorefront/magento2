import { FetchResult } from '@apollo/client';
import addProductsToCart from './addProductsToCart';
import {
  AddProductsToCartMutation, CartItemInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export type AddProductsToCartInput = {
  cartId: string;
  cartItems: CartItemInput[];
};

export default async (
  { client }: Context,
  input: AddProductsToCartInput,
): Promise<FetchResult<AddProductsToCartMutation>> => client
  .mutate<AddProductsToCartMutation, AddProductsToCartInput>({
  mutation: addProductsToCart,
  variables: input,
});
