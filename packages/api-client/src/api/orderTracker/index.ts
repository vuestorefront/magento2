import { ApolloQueryResult } from '@apollo/client/core';
import { FocusTrackedOrdersQuery, FocusTrackedOrdersQueryVariables } from '../../types/GraphQL';
import trackedOrders from './trackedOrders';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  orderParams: FocusTrackedOrdersQueryVariables,
): Promise<ApolloQueryResult<FocusTrackedOrdersQuery>> => client
  .query<FocusTrackedOrdersQuery, FocusTrackedOrdersQueryVariables>({
  query: trackedOrders,
  variables: orderParams,
  fetchPolicy: 'no-cache',
});
