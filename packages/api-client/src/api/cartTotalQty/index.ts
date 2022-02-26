import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CartQuery, CartQueryVariables } from '../../types/GraphQL';
import query from './cartTotalQty';
import { Context } from '../../types/context';

export default async (
  context: Context,
  cartId: string,
  customQuery: CustomQuery = { cartTotalQty: 'cartTotalQty' },
): Promise<ApolloQueryResult<CartQuery>> => {
  const { cartTotalQty } = context.extendQuery(
    customQuery,
    {
      cartTotalQty: {
        query,
        variables: { cartId: cartId ?? '' },
      },
    },
  );
  return context.client.query<CartQuery, CartQueryVariables>({
    query: cartTotalQty.query,
    variables: cartTotalQty.variables,
  });
};
