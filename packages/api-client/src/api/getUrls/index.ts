import { ApolloQueryResult } from 'apollo-client';
import { urlResolver } from '../../types/GraphQL';
import query from './query';

const getUrls = async ({ client }, url: string): Promise<ApolloQueryResult<urlResolver>> => {
  return await client.query({
    query,
    variables: { url }
  });
};

export default getUrls;
