import { ApolloQueryResult } from '@apollo/client/core';
import { FocusInventoryQuery, FocusInventoryQueryVariables, CachedQuery } from '../../types/GraphQL';
import focusInventory from './focusInventory';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: FocusInventoryQueryVariables,
): Promise<ApolloQueryResult<CachedQuery<FocusInventoryQuery>>> => client
  .query<CachedQuery<FocusInventoryQuery>, FocusInventoryQueryVariables>({
  query: focusInventory,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
