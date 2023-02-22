import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/middleware';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import {
  AddProductsToCartMutation, CartItemInput,
} from '../../types/GraphQL';
import addProductsToCartMutation from './addProductsToCart';
import getHeaders from '../getHeaders';

export type AddProductsToCartInput = {
  cartId: string;
  cartItems: CartItemInput[];
};

/**
 * Adds products to the specified cart
 * @param context VSF Context
 * @param input ID of the cart and products to be added
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function addProductsToCart(
  context: Context,
  input: AddProductsToCartInput,
  customQuery: CustomQuery = { addProductsToCart: 'addProductsToCart' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<AddProductsToCartMutation>> {
  const { addProductsToCart: addProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addProductsToCart: {
        query: addProductsToCartMutation,
        variables: { ...input },
      },
    },
  );
  return context.client.mutate<AddProductsToCartMutation, AddProductsToCartInput>({
    mutation: addProductsToCartGQL.query,
    variables: addProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
