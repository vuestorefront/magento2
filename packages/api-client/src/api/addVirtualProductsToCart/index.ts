import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import addVirtualProductsToCart from './addVirtualProductsToCart';
import {
  AddVirtualProductsToCartInput,
  AddVirtualProductsToCartMutation,
  AddVirtualProductsToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: AddVirtualProductsToCartInput,
  customQuery: CustomQuery = { addVirtualProductsToCart: 'addVirtualProductsToCart' },
): Promise<FetchResult<AddVirtualProductsToCartMutation>> => {
  const { addVirtualProductsToCart: addVirtualProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addVirtualProductsToCart: {
        query: addVirtualProductsToCart,
        variables: { input },
      },
    },
  );
  return context.client.mutate<AddVirtualProductsToCartMutation, AddVirtualProductsToCartMutationVariables>({
    mutation: addVirtualProductsToCartGQL.query,
    variables: { input },
  });
};
