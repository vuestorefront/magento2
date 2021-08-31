import { ApolloQueryResult } from '@apollo/client/core';
import {
  PickupLocationsQuery,
  QueryPickupLocationsArgs,
} from '../../types/GraphQL';
import pickupLocations from './pickupLocations';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  searchParams?: QueryPickupLocationsArgs,
): Promise<ApolloQueryResult<PickupLocationsQuery>> => {
  const defaultParams = {
    pageSize: 20,
    currentPage: 1,
    ...searchParams,
  };

  const variables: QueryPickupLocationsArgs = {
    pageSize: defaultParams.pageSize <= 0 ? 20 : defaultParams.pageSize,
    currentPage: defaultParams.currentPage <= 0 ? 1 : defaultParams.currentPage,
  };

  if (defaultParams.area) variables.area = defaultParams.area;

  if (defaultParams.filters) variables.filters = defaultParams.filters;

  if (defaultParams.productsInfo) variables.productsInfo = defaultParams.productsInfo;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  return client
    .query<PickupLocationsQuery, QueryPickupLocationsArgs>({
    query: pickupLocations,
    variables,
    fetchPolicy: 'cache-first',
  });
};
