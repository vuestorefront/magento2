import { ApolloQueryResult } from 'apollo-client';
import { CustomerQuery } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CustomerQuery>> => client
  .query<CustomerQuery>({
  query,
  fetchPolicy: 'no-cache',
});
