import { ApolloQueryResult } from 'apollo-client';
import { CustomerOrdersQuery } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CustomerOrdersQuery>> => client
  .query<CustomerOrdersQuery>({
  query,
  fetchPolicy: 'no-cache',
});
