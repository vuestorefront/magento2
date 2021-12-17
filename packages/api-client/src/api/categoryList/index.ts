import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CategoryListQuery, CategoryListQueryVariables } from '../../types/GraphQL';
import categoryList from './categoryList';
import { Context } from '../../types/context';

export default async (
  context: Context,
  params: CategoryListQueryVariables,
  customQuery: CustomQuery = { categoryList: 'categoryList' },
): Promise<ApolloQueryResult<CategoryListQuery>> => {
  const { categoryList: categoryListGQL } = context.extendQuery(
    customQuery,
    {
      categoryList: {
        query: categoryList,
        variables: { ...params },
      },
    },
  );
  return context.client.query<CategoryListQuery, CategoryListQueryVariables>({
    query: categoryListGQL.query,
    variables: categoryListGQL.variables,
  });
};
