import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import addBundleProductsToCart from './addBundleProductsToCart';
import {
  AddBundleProductsToCartMutation,
  AddBundleProductsToCartMutationVariables,
  AddBundleProductsToCartInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  input: AddBundleProductsToCartInput,
  customQuery: CustomQuery = { addBundleProductsToCart: 'addBundleProductsToCart' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<AddBundleProductsToCartMutation>> => {
  const { addBundleProductsToCart: addBundleProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addBundleProductsToCart: {
        query: addBundleProductsToCart,
        variables: { input },
      },
    },
  );

  return context.client
    .mutate<any, AddBundleProductsToCartMutationVariables>({
    mutation: addBundleProductsToCartGQL.query,
    variables: addBundleProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
