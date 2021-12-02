import { ApolloQueryResult } from 'apollo-client';
import {
  AvailableStoresQuery,
} from '../../types/GraphQL';
import availableStores from './availableStores';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<AvailableStoresQuery>> => client
  .query<AvailableStoresQuery>({
    query: availableStores,
  });
