import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CartQuery, CartQueryVariables } from '../../types/GraphQL';
import cart from './cart';
import { Context } from '../../types/context';

export default async (
  context: Context,
  cartId: string,
  customQuery: CustomQuery = { cart: 'cart' },
): Promise<ApolloQueryResult<CartQuery>> => {
  const { cart: cartGQL } = context.extendQuery(
    customQuery,
    {
      cart: {
        query: cart,
        variables: { cartId },
      },
    },
  );
  return context.client.query<CartQuery, CartQueryVariables>({
    query: cartGQL.query,
    variables: cartGQL.variables,
  });
};
