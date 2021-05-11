import { ApolloQueryResult } from 'apollo-client';
import { CustomerOrdersQuery, CustomerOrdersQueryVariables } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  orderParams: CustomerOrdersQueryVariables,
): Promise<ApolloQueryResult<CustomerOrdersQuery>> => client
  .query<CustomerOrdersQuery, CustomerOrdersQueryVariables>({
  query,
  variables: orderParams,
  fetchPolicy: 'no-cache',
});
