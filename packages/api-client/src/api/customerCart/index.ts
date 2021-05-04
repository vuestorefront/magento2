import { ApolloQueryResult } from 'apollo-client';
import { CustomerCartQuery } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CustomerCartQuery>> => client
  .query<CustomerCartQuery>({
  query,
  fetchPolicy: 'no-cache',
});
