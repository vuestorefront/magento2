import { storeConfigQuery } from '../../types/GraphQL';
import query from './query';
import { ApolloQueryResult } from 'apollo-client';

const getConfig = async ({ client }): Promise<ApolloQueryResult<storeConfigQuery>> => {

  return await client.query({
    query: query
  });
};

export default getConfig;
