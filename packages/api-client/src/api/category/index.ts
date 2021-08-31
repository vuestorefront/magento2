import { ApolloQueryResult } from '@apollo/client/core';
import { CategoryQuery, CategorySearchQueryVariables, CachedQuery } from '../../types/GraphQL';
import category from './category';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategorySearchQueryVariables,
): Promise<ApolloQueryResult<CachedQuery<CategoryQuery>>> => client
  .query<CachedQuery<CategoryQuery>, CategorySearchQueryVariables>({
  query: category,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
