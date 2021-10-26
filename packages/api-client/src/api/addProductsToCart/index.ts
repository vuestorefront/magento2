import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
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
  context: Context,
  input: AddProductsToCartInput,
  customQuery: CustomQuery = { addProductsToCart: 'addProductsToCart' },
): Promise<FetchResult<AddProductsToCartMutation>> => {
  const { addProductsToCart: addProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addProductsToCart: {
        query: addProductsToCart,
        variables: { ...input },
      },
    },
  );
  return context.client.mutate<AddProductsToCartMutation, AddProductsToCartInput>({
    mutation: addProductsToCartGQL.query,
    variables: addProductsToCartGQL.variables,
  });
};
