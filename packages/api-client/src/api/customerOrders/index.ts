import { ApolloQueryResult } from '@apollo/client/core';
import {
  CustomQuery,
  CustomerOrdersFilterInput,
  CustomerOrdersQuery,
  CustomerOrdersQueryVariables,
  GetOrdersSearchParams,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import customerOrdersQuery from './customerOrders';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

type Variables = {
  pageSize: number;
  currentPage: number;
  filter?: CustomerOrdersFilterInput;
};

/**
 * Returns customer orders. To override the default query, use the `customerOrders` query key.
 */
export default async (
  context: Context,
  searchParams: GetOrdersSearchParams,
  customQuery: CustomQuery = { customerOrders: 'customerOrders' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CustomerOrdersQuery>> => {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize <= 0 ? 10 : defaultParams.pageSize,
    currentPage: defaultParams.currentPage <= 0 ? 1 : defaultParams.currentPage,
  };

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  const { customerOrders } = context.extendQuery(customQuery, {
    customerOrders: {
      query: customerOrdersQuery,
      variables,
    },
  });

  try {
    return await context.client.query<CustomerOrdersQuery, CustomerOrdersQueryVariables>({
      query: customerOrders.query,
      variables: customerOrders.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
