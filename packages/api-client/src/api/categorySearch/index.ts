import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CategorySearchQuery, CategorySearchQueryVariables, CachedQuery } from '../../types/GraphQL';
import categorySearch from './categorySearch';
import { Context } from '../../types/context';

export default async (
  context: Context,
  filters: CategorySearchQueryVariables,
  customQuery: CustomQuery = { categorySearch: 'categorySearch' },
): Promise<ApolloQueryResult<CachedQuery<CategorySearchQuery>>> => {
  const { categorySearch: categorySearchGQL } = context.extendQuery(
    customQuery,
    {
      categorySearch: {
        query: categorySearch,
        variables: { ...filters },
      },
    },
  );

  return context.client.query<CachedQuery<CategorySearchQuery>, CategorySearchQueryVariables>({
    query: categorySearchGQL.query,
    variables: categorySearchGQL.variables,
  });
};
