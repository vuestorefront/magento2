import { ApolloQueryResult } from 'apollo-client';
import { WishlistQuery, WishlistQueryVariables } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  queryParams: WishlistQueryVariables,
): Promise<ApolloQueryResult<WishlistQuery>> => client
  .query<WishlistQuery, WishlistQueryVariables>({
  query,
  fetchPolicy: 'no-cache',
  variables: queryParams,
});
