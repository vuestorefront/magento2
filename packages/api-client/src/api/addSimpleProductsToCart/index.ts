import { FetchResult } from '@apollo/client/core';
import {
  CustomQuery,
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AddSimpleProductsToCartMutationVariables,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import addSimpleProductsToCart from './addSimpleProductsToCart';
import { Context } from '../../types/context';
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
