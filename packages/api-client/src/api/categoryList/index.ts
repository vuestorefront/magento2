import { ApolloQueryResult } from '@apollo/client/core';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import { CategoryListQuery, CustomQuery, QueryCategoryListArgs } from '@vsf-enterprise/magento-api-types';
import gql from 'graphql-tag';
import categoryListQuery from './categoryList';
import { Context } from '../../types/context';
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
  params: QueryCategoryListArgs,
  customQuery: CustomQuery = { categoryList: 'categoryList' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CategoryListQuery>> {
  const { categoryList: categoryListGQL } = context.extendQuery(customQuery, {
    categoryList: {
      query: categoryListQuery,
      variables: { ...params },
    },
  });

  return context.client.query<CategoryListQuery, QueryCategoryListArgs>({
    query: gql`${categoryListGQL.query}`,
    variables: categoryListGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
