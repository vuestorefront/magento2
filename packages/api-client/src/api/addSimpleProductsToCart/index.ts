import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import addSimpleProductsToCart from './addSimpleProductsToCart';
import {
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AddSimpleProductsToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  input: AddSimpleProductsToCartInput,
  customQuery: CustomQuery = { addSimpleProductsToCart: 'addSimpleProductsToCart' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<AddSimpleProductsToCartMutation>> => {
  const { addSimpleProductsToCart: addSimpleProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addSimpleProductsToCart: {
        query: addSimpleProductsToCart,
        variables: { input },
      },
    },
  );
  return context.client.mutate<AddSimpleProductsToCartMutation, AddSimpleProductsToCartMutationVariables>({
    mutation: addSimpleProductsToCartGQL.query,
    variables: addSimpleProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
