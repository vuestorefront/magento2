import { ApolloQueryResult } from 'apollo-client';
import { WishlistQuery, WishlistQueryVariables } from '../../types/GraphQL';
import wishlist from './wishlist';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  queryParams: WishlistQueryVariables,
): Promise<ApolloQueryResult<WishlistQuery>> => client
  .query<WishlistQuery, WishlistQueryVariables>({
  query: wishlist,
  fetchPolicy: 'no-cache',
  variables: queryParams,
});
