import { ApolloQueryResult } from '@apollo/client';
import { CustomerReturnQuery, CustomerReturnQueryVariables } from '../../types/GraphQL';
import customerReturn from './customerReturn';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  returnParams: CustomerReturnQueryVariables,
): Promise<ApolloQueryResult<CustomerReturnQuery>> => client
  .query<CustomerReturnQuery, CustomerReturnQueryVariables>({
  query: customerReturn,
  variables: returnParams,
  fetchPolicy: 'no-cache',
});
