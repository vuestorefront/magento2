import type { ApolloQueryResult } from '@apollo/client/core';
import type {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  RelatedProductsQuery,
  RelatedProductsQueryVariables,
} from '@vsf-enterprise/magento-api-types';
import gql from 'graphql-tag';
import relatedProductsQuery from './relatedProducts';
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
export default async function relatedProducts(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { relatedProducts: 'relatedProducts' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<RelatedProductsQuery>> {
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

  const { relatedProducts: relatedProductsGQL } = context.extendQuery(customQuery, {
    relatedProducts: {
      query: relatedProductsQuery,
      variables,
    },
  });

  try {
    return await context.client.query<RelatedProductsQuery, RelatedProductsQueryVariables>({
      query: gql`${relatedProductsGQL.query}`,
      variables: relatedProductsGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
