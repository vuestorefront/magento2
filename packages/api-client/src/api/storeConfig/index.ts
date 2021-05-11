import { ApolloQueryResult } from 'apollo-client';
import { StoreConfigQuery } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<StoreConfigQuery>> => client
  .query<StoreConfigQuery>({
  query,
});
