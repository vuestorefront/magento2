import type { ApolloQueryResult } from '@apollo/client/core';
import type {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  RelatedProductQuery,
  RelatedProductQueryVariables,
} from '@vsf-enterprise/magento-api-types';
import gql from 'graphql-tag';
import relatedProductQuery from './relatedProduct';
import type { Context } from '../../types/context';
import getHeaders from '../getHeaders';

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

/**
 * Searches for related products using params for sorting, filtering and
 * pagination.
 *
 * @param context VSF context
 * @param searchParams params for sorting, filtering and pagination
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function relatedProduct(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { relatedProduct: 'relatedProduct' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<RelatedProductQuery>> {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { relatedProduct: relatedProductGQL } = context.extendQuery(customQuery, {
    relatedProduct: {
      query: relatedProductQuery,
      variables,
    },
  });

  try {
    return await context.client.query<RelatedProductQuery, RelatedProductQueryVariables>({
      query: gql`${relatedProductGQL.query}`,
      variables: relatedProductGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
