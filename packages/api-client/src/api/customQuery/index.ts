import { ApolloQueryResult, FetchPolicy } from '@apollo/client/core';
import { DocumentNode } from 'graphql';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async <QUERY = any, QUERY_VARIABLES = any>(
  context: Context,
  {
    query,
    queryVariables,
    fetchPolicy,
  }: {
    query: DocumentNode,
    queryVariables?: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
  },
): Promise<ApolloQueryResult<QUERY>> => context.client.query<QUERY, QUERY_VARIABLES>({
  query,
  variables: { ...queryVariables },
  fetchPolicy: fetchPolicy || 'no-cache',
  context: {
    headers: getHeaders(context),
  },
});
