import { ApolloQueryResult } from 'apollo-client';
import { CartQuery } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CartQuery>> => client
  .query<CartQuery>({
  query,
  fetchPolicy: 'no-cache',
});
