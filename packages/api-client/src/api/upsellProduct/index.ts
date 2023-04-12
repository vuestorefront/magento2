import type { ApolloQueryResult } from '@apollo/client/core';
import type {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  UpsellProductsQuery,
  UpsellProductsQueryVariables,
} from '@vsf-enterprise/magento-api-types';
import upsellProducts from './upsellProducts';
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
 * Returns upsell products matching the provided parameters. To override the default query, use the `upsellProducts` query key.
 */
export default async (
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { upsellProducts: 'upsellProducts' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<UpsellProductsQuery>> => {
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

  const { upsellProducts: upsellProductsGQL } = context.extendQuery(customQuery, {
    upsellProducts: {
      query: upsellProducts,
      variables,
    },
  });

  try {
    return await context.client.query<UpsellProductsQuery, UpsellProductsQueryVariables>({
      query: upsellProductsGQL.query,
      variables: upsellProductsGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
