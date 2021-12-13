import { FetchResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/core';
import addConfigurableProductsToCart from './addConfigurableProductsToCart';
import {
  AddConfigurableProductsToCartMutationVariables,
  AddConfigurableProductsToCartMutation,
  AddConfigurableProductsToCartInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: AddConfigurableProductsToCartInput,
  customQuery: CustomQuery = { addConfigurableProductsToCart: 'addConfigurableProductsToCart' },
): Promise<FetchResult<AddConfigurableProductsToCartMutation>> => {
  const { addConfigurableProductsToCart: addConfigurableProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addConfigurableProductsToCart: {
        query: addConfigurableProductsToCart,
        variables: { input },
      },
    },
  );
  return context.client.mutate<any, AddConfigurableProductsToCartMutationVariables>({
    mutation: addConfigurableProductsToCartGQL.query,
    variables: { input },
  });
};
