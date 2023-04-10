import type { ApolloQueryResult } from '@apollo/client/core';
import type { CustomQuery } from '@vue-storefront/middleware';
import crosssellProducts from './crosssellProducts';
import type { Context } from '../../types/context';
import type { GetProductSearchParams, CustomHeaders } from '../../types/API';
import type {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  CrosssellProductsQuery,
  CrosssellProductsQueryVariables,
} from '../../types/GraphQL';
import getHeaders from '../getHeaders';

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

/**
 * Returns crosssell products matching the provided parameters. To override the default query, use the `crosssellProducts` query key.
 */
export default async (
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { crosssellProducts: 'crosssellProducts' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CrosssellProductsQuery>> => {
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

  const { crosssellProducts: crosssellProductsGQL } = context.extendQuery(customQuery, {
    crosssellProducts: {
      query: crosssellProducts,
      variables,
    },
  });

  try {
    return await context.client.query<CrosssellProductsQuery, CrosssellProductsQueryVariables>({
      query: crosssellProductsGQL.query,
      variables: crosssellProductsGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
