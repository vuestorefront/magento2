import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery, Logger } from '@vue-storefront/core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQuery,
  ProductDetailsQueryVariables,
} from '../../types/GraphQL';
import detailQuery from './productDetailsQuery';
import { Context } from '../../types/context';
import { GetProductSearchParams } from '../../types/API';

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

export default async (
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<ProductDetailsQuery>> => {
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

  const { products } = context.extendQuery(customQuery, {
    products: {
      query: detailQuery,
      variables,
    },
  });

  const query = customQuery ? gql`${products.query}` : products.query;

  try {
    const result = await context.client.query<ProductDetailsQuery, ProductDetailsQueryVariables>({
      query,
      variables: products.variables,
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
};
