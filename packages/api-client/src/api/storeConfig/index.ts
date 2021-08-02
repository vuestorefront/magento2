import { ApolloQueryResult } from 'apollo-client';
import { StoreConfigQuery } from '../../types/GraphQL';
import storeConfig from './storeConfig';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<StoreConfigQuery>> => client
  .query<StoreConfigQuery>({
  query: storeConfig,
});
