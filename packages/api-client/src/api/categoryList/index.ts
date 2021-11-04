import { ApolloQueryResult } from 'apollo-client';
import { CategoryListQuery, CategoryListQueryVariables } from '../../types/GraphQL';
import categoryList from './categoryList';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategoryListQueryVariables,
): Promise<ApolloQueryResult<CategoryListQuery>> => client
  .query<CategoryListQuery, CategoryListQueryVariables>({
  query: categoryList,
  variables: { ...params },
});
