import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import addSimpleProductsToCart from './addSimpleProductsToCart';
import {
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AddSimpleProductsToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: AddSimpleProductsToCartInput,
  customQuery: CustomQuery = { addSimpleProductsToCart: 'addSimpleProductsToCart' },
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
    errorPolicy: 'all',
  });
};
