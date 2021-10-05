import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';
import { FetchPolicy } from 'apollo-client/core/watchQueryOptions';
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
    fetchPolicy?: FetchPolicy,
  },
): Promise<FetchResult<MUTATION>> => client
  .mutate<MUTATION, MUTATION_VARIABLES>({
  mutation: gql`${mutation}`,
  variables: { ...mutationVariables },
  fetchPolicy: fetchPolicy || 'no-cache',
});
