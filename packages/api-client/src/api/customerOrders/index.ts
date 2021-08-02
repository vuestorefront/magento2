import { ApolloQueryResult } from 'apollo-client';
import { CustomerOrdersQuery, CustomerOrdersQueryVariables } from '../../types/GraphQL';
import customerOrders from './customerOrders';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  orderParams: CustomerOrdersQueryVariables,
): Promise<ApolloQueryResult<CustomerOrdersQuery>> => client
  .query<CustomerOrdersQuery, CustomerOrdersQueryVariables>({
  query: customerOrders,
  variables: orderParams,
  fetchPolicy: 'no-cache',
});
