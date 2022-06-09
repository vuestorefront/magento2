import gql from 'graphql-tag';
import { FetchPolicy, FetchResult } from '@apollo/client/core';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async <MUTATION = any, MUTATION_VARIABLES = any>(
  context: Context,
  {
    mutation,
    mutationVariables,
    fetchPolicy,
  }: {
    mutation: string,
    mutationVariables: MUTATION_VARIABLES,
    fetchPolicy?: Extract<FetchPolicy, 'network-only' | 'no-cache'>,
  },
): Promise<FetchResult<MUTATION>> => context.client.mutate<MUTATION, MUTATION_VARIABLES>({
  mutation: gql`${mutation}`,
  variables: { ...mutationVariables },
  fetchPolicy: fetchPolicy || 'no-cache',
  context: {
    headers: getHeaders(context),
  },
});
