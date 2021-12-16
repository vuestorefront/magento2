import gql from 'graphql-tag';
import { FetchPolicy, FetchResult } from '@apollo/client';
import { Context } from '../../types/context';

export default async <MUTATION = any, MUTATION_VARIABLES = any>(
  { client }: Context,
  {
    mutation,
    mutationVariables,
    fetchPolicy,
  }: {
    mutation: MUTATION,
    mutationVariables: MUTATION_VARIABLES,
    fetchPolicy?: Extract<FetchPolicy, 'network-only' | 'no-cache'>,
  },
): Promise<FetchResult<MUTATION>> => client
  .mutate<MUTATION, MUTATION_VARIABLES>({
  mutation: gql`${mutation}`,
  variables: { ...mutationVariables },
  fetchPolicy: fetchPolicy || 'no-cache',
});
