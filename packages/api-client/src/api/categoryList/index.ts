import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CategoryListQuery, CategoryListQueryVariables } from '../../types/GraphQL';
import categoryListQuery from './categoryList';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

/**
 * Fetches the category list.
 *
 * @param context VSF Context
 * @param params
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function categoryList(
  context: Context,
  params: CategoryListQueryVariables,
  customQuery: CustomQuery = { categoryList: 'categoryList' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CategoryListQuery>> {
  const { categoryList: categoryListGQL } = context.extendQuery(customQuery, {
    categoryList: {
      query: categoryListQuery,
      variables: { ...params },
    },
  });

  return context.client.query<CategoryListQuery, CategoryListQueryVariables>({
    query: categoryListGQL.query,
    variables: categoryListGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
