import gql from 'graphql-tag';
import { ApolloQueryResult, FetchPolicy } from '@apollo/client/core';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async <QUERY = any, QUERY_VARIABLES = any>(
  context: Context,
  {
    query,
    queryVariables,
    fetchPolicy,
    customHeaders,
  }: {
    query: string,
    queryVariables?: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
    customHeaders?: CustomHeaders,
  },
): Promise<ApolloQueryResult<QUERY>> => context.client.query<QUERY, QUERY_VARIABLES>({
  query: gql`${query}`,
  variables: { ...queryVariables },
  fetchPolicy: fetchPolicy || 'no-cache',
  context: {
    headers: getHeaders(context, customHeaders),
  },
});
