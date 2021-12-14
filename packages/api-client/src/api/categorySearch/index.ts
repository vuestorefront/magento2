import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import { CategorySearchQuery, CategorySearchQueryVariables } from '../../types/GraphQL';
import categorySearch from './categorySearch';
import { Context } from '../../types/context';

export default async (
  context: Context,
  params: CategorySearchQueryVariables,
  customQuery: CustomQuery = { categorySearch: 'categorySearch' },
): Promise<ApolloQueryResult<CategorySearchQuery>> => {
  const { categorySearch: categorySearchGQL } = context.extendQuery(
    customQuery,
    {
      categorySearch: {
        query: categorySearch,
        variables: { ...params },
      },
    },
  );
  return context.client.query<CategorySearchQuery, CategorySearchQueryVariables>({
    query: categorySearchGQL,
    variables: { ...params },
  });
};
