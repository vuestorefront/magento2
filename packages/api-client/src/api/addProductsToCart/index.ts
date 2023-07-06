import { FetchResult } from '@apollo/client/core';
import gql from 'graphql-tag';
import { CustomQuery, AddProductsToCartInput, AddProductsToCartMutation, CustomHeaders } from '@vue-storefront/magento-types';
import { Context } from '../../types/context';
import addProductsToCartMutation from './addProductsToCart';
import getHeaders from '../getHeaders';

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
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddProductsToCartMutation>> {
  const { addProductsToCart: addProductsToCartGQL } = context.extendQuery(customQuery, {
    addProductsToCart: {
      query: addProductsToCartMutation,
      variables: { ...input },
    },
  });
  return context.client.mutate<AddProductsToCartMutation, AddProductsToCartInput>({
    mutation: gql`
      ${addProductsToCartGQL.query}
    `,
    variables: addProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
