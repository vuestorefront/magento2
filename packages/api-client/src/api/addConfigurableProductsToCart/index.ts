import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import type { Context } from '../../types/context';
import {
  AddConfigurableProductsToCartInput, AddConfigurableProductsToCartMutation, AddConfigurableProductsToCartMutationVariables,
} from '../../types/GraphQL';
import addConfigurableProductsToCartMutation from './addConfigurableProductsToCart';
import getHeaders from '../getHeaders';

/**
 * Adds a set of configurable products to a specified cart
 * @param context VSF Context
 * @param input ID of the cart and products to be added
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 */
export default async function addConfigurableProductsToCart(
  context: Context,
  input: AddConfigurableProductsToCartInput,
  customQuery: CustomQuery = { addConfigurableProductsToCart: 'addConfigurableProductsToCart' },
): Promise<FetchResult<AddConfigurableProductsToCartMutation>> {
  const { addConfigurableProductsToCart: addConfigurableProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addConfigurableProductsToCart: {
        query: addConfigurableProductsToCartMutation,
        variables: { input },
      },
    },
  );
  return context.client.mutate<any, AddConfigurableProductsToCartMutationVariables>({
    mutation: addConfigurableProductsToCartGQL.query,
    variables: addConfigurableProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context),
    },
  });
}
