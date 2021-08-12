import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CategoryListQuery, CategoryListQueryVariables, CachedQuery } from '../../types/GraphQL';
import categoryList from './categoryList';
import { Context } from '../../types/context';

export default async (
  context: Context,
  params: CategoryListQueryVariables,
  customQuery: CustomQuery = { categoryList: 'categoryList' },
): Promise<ApolloQueryResult<CachedQuery<CategoryListQuery>>> => {
  const { categoryList: categoryListGQL } = context.extendQuery(
    customQuery,
    {
      categoryList: {
        query: categoryList,
        variables: { ...params },
      },
    },
  );
  return context.client.query<CachedQuery<CategoryListQuery>, CategoryListQueryVariables>({
    query: categoryListGQL.query,
    variables: categoryListGQL.variables,
  });
};
