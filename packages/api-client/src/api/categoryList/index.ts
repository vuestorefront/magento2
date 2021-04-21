import { ApolloQueryResult } from 'apollo-client';
import { CategoryFilterInput, CategoryListQuery, CategoryListQueryVariables } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  filters: CategoryFilterInput,
): Promise<ApolloQueryResult<CategoryListQuery>> => client
  .query<CategoryListQuery, CategoryListQueryVariables>({
  query,
  variables: { filters },
});
