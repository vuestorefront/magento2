import { ApolloQueryResult } from 'apollo-client';
import { CategoryListQuery, CategoryListQueryVariables } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategoryListQueryVariables,
): Promise<ApolloQueryResult<CategoryListQuery>> => client
  .query<CategoryListQuery, CategoryListQueryVariables>({
  query,
  variables: { ...params },
});
