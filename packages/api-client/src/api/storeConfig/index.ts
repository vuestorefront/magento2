import { ApolloQueryResult } from 'apollo-client';
import { StoreConfigQuery } from '../../types/GraphQL';
import query from './query';
import { Context } from '../../types/context';

const getConfig = async ({ client }: Context): Promise<ApolloQueryResult<StoreConfigQuery>> => client.query({
  query,
});

export default getConfig;
