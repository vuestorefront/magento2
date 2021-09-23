import { ApolloQueryResult } from '@apollo/client/core';
import { CompareListQuery, QueryCompareListArgs } from '../../types/GraphQL';
import compareList from './compareList';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  uid: string,
): Promise<ApolloQueryResult<CompareListQuery>> => client
  .query<CompareListQuery, QueryCompareListArgs>({
  query: compareList,
  fetchPolicy: 'no-cache',
  variables: { uid },
});
