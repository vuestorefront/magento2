import { ApolloQueryResult } from 'apollo-client';
import { WishlistQuery } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<WishlistQuery>> => client
  .query<WishlistQuery>({
  query,
  fetchPolicy: 'no-cache',
});
