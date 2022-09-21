import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CategorySearchQuery, CategorySearchQueryVariables } from '../../types/GraphQL';
import categorySearchQuery from './categorySearch';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

/**
 * Searches for categories using received filters.
 *
 * @param context VSF Context
 * @param filters filters used to search for categories. A filter contains at
 * least one attribute, a comparison operator, and the value that is being
 * searched for.
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function categorySearch(
  context: Context,
  filters: CategorySearchQueryVariables,
  customQuery: CustomQuery = { categorySearch: 'categorySearch' },
  customHeaders: CustomHeaders = {},
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
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
