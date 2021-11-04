import { ApolloQueryResult } from 'apollo-client';
import { CartQuery, CartQueryVariables } from '../../types/GraphQL';
import cart from './cart';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  cartId: string,
): Promise<ApolloQueryResult<CartQuery>> => client
  .query<CartQuery, CartQueryVariables>({
  query: cart,
  variables: { cartId },
});
