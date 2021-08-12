import gql from 'graphql-tag';
import { ApolloQueryResult, FetchPolicy } from '@apollo/client/core';
import { Context } from '../../types/context';
import { CachedQuery } from '../../types/GraphQL';

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
): Promise<ApolloQueryResult<CachedQuery<QUERY>>> => client
  .query<CachedQuery<QUERY>, QUERY_VARIABLES>({
  query: gql`${query}`,
  variables: { ...queryVariables },
  fetchPolicy: fetchPolicy || 'no-cache',
});
