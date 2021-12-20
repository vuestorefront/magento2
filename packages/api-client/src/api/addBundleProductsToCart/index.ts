import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import addBundleProductsToCart from './addBundleProductsToCart';
import {
  AddBundleProductsToCartMutation,
  AddBundleProductsToCartMutationVariables,
  AddBundleProductsToCartInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: AddBundleProductsToCartInput,
  customQuery: CustomQuery = { addBundleProductsToCart: 'addBundleProductsToCart' },
): Promise<FetchResult<AddBundleProductsToCartMutation>> => {
  const { addBundleProductsToCart: addBundleProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addBundleProductsToCart: {
        query: addBundleProductsToCart,
        variables: input,
      },
    },
  );

  return context.client
    .mutate<any, AddBundleProductsToCartMutationVariables>({
    mutation: addBundleProductsToCartGQL.query,
    variables: addBundleProductsToCartGQL.variables,
  });
};
