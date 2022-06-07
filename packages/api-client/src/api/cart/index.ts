import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { Context } from '../../types/context';
import type { CartQuery, CartQueryVariables } from '../../types/GraphQL';
import cartQuery from './cart';
import getHeaders from '../getHeaders';

/**
 * Fetches a cart by its ID
 * @param context VSF context
 * @param cartId ID of the cart to fetch
 * @param customQuery custom GraphQL query that extends the default one
 */
export default async function cart(
  context: Context,
  cartId: string,
  customQuery: CustomQuery = { cart: 'cart' },
): Promise<ApolloQueryResult<CartQuery>> {
  const { cart: cartGQL } = context.extendQuery(
    customQuery,
    {
      cart: {
        query: cartQuery,
        variables: { cartId: cartId ?? '' },
      },
    },
  );
  return context.client.query<CartQuery, CartQueryVariables>({
    query: cartGQL.query,
    variables: cartGQL.variables,
    context: {
      headers: getHeaders(context),
    },
  });
}
