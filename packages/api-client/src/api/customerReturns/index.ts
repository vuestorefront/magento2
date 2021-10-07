import { ApolloQueryResult } from '@apollo/client/core';
import { CustomerReturnsQuery, CustomerReturnsQueryVariables } from '../../types/GraphQL';
import customerReturns from './customerReturns';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  returnParams: CustomerReturnsQueryVariables,
): Promise<ApolloQueryResult<CustomerReturnsQuery>> => client
  .query<CustomerReturnsQuery, CustomerReturnsQueryVariables>({
  query: customerReturns,
  variables: returnParams,
  fetchPolicy: 'no-cache',
});
