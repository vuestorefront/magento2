import { ApolloQueryResult } from 'apollo-client';
import { CartQuery, CartQueryVariables } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  cartId: string,
): Promise<ApolloQueryResult<CartQuery>> => client
  .query<CartQuery, CartQueryVariables>({
  query,
  variables: { cartId },
  fetchPolicy: 'no-cache',
});
