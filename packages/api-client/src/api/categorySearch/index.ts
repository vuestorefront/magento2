import { ApolloQueryResult } from 'apollo-client';
import { CategorySearchQuery, CategorySearchQueryVariables } from '../../types/GraphQL';
import categorySearch from './categorySearch';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategorySearchQueryVariables,
): Promise<ApolloQueryResult<CategorySearchQuery>> => client
  .query<CategorySearchQuery, CategorySearchQueryVariables>({
  query: categorySearch,
  variables: { ...params },
});
