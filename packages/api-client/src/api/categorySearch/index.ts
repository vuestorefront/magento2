import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CategorySearchQuery, CategorySearchQueryVariables } from '../../types/GraphQL';
import categorySearchQuery from './categorySearch';
import { Context } from '../../types/context';

export default async function categorySearch(
  context: Context,
  filters: CategorySearchQueryVariables,
  customQuery: CustomQuery = { categorySearch: 'categorySearch' },
): Promise<ApolloQueryResult<CategorySearchQuery>> {
  const { categorySearch: categorySearchGQL } = context.extendQuery(customQuery, {
    categorySearch: {
      query: categorySearchQuery,
      variables: { ...filters },
    },
  });

  return context.client.query<CategorySearchQuery, CategorySearchQueryVariables>({
    query: categorySearchGQL.query,
    variables: categorySearchGQL.variables,
  });
}
