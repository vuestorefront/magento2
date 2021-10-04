import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { FetchPolicy } from 'apollo-client/core/watchQueryOptions';
import { Context } from '../../types/context';

export default async <QUERY = any, QUERY_VARIABLES = any>(
  { client }: Context,
  {
    query,
    queryVariables,
    fetchPolicy,
  }: {
    query: QUERY,
    queryVariables?: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
  },
): Promise<ApolloQueryResult<QUERY>> => client
  .query<QUERY, QUERY_VARIABLES>({
  query: gql`${query}`,
  variables: { ...queryVariables },
  fetchPolicy: fetchPolicy || 'no-cache',
});
