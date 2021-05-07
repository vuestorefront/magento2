import { ApolloQueryResult } from 'apollo-client';
import { CategorySearchQuery, CategorySearchQueryVariables } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategorySearchQueryVariables,
): Promise<ApolloQueryResult<CategorySearchQuery>> => client
  .query<CategorySearchQuery, CategorySearchQueryVariables>({
  query,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
