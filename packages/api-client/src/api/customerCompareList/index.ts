import { ApolloQueryResult } from '@apollo/client/core';
import { CustomerCompareListQuery } from '../../types/GraphQL';
import customerCompareList from './customerCompareList';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
): Promise<ApolloQueryResult<CustomerCompareListQuery>> => client
  .query<CustomerCompareListQuery>({
  query: customerCompareList,
  fetchPolicy: 'no-cache',
});
