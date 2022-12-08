import { CustomQuery, Logger } from '@vue-storefront/core';
import type { ApolloQueryResult } from '@apollo/client/core';
import productDetailsQuery from './productDetailsQuery';
import type {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQuery,
  ProductDetailsQueryVariables,
} from '../../types/GraphQL';
import type { Context } from '../../types/context';
import type { GetProductSearchParams, CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

/**
 * Fetches the list of products with details using sort, filters and pagination.
 *
 * @param context VSF context
 * @param searchParams params with sort, filters and pagination
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function productDetail(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { productDetail: 'productDetail' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<ProductDetailsQuery>> {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    ...defaultParams,
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { productDetail: productDetailGQL } = context.extendQuery(customQuery, {
    productDetail: {
      query: productDetailsQuery,
      variables,
    },
  });

  try {
    const result = await context.client.query<ProductDetailsQuery, ProductDetailsQueryVariables>({
      query: productDetailGQL.query,
      variables: productDetailGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });

    if (result.data.products.items.length === 0) throw new Error('No products found');

    return result;
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      Logger.debug(error);

      return {
        ...error,
        errors: error.graphQLErrors,
        data: null,
      };
    }
    Logger.error(error);
    throw error.networkError?.result || error;
  }
}
