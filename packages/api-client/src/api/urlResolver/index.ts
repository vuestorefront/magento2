import { urlResolver } from '../../types/GraphQL';
import query from './query';
import { ApolloQueryResult } from 'apollo-client';

const getUrl = async ({ client }, url: string): Promise<ApolloQueryResult<urlResolver>> => {

  return await client.query({
    query: query,
    variables: { url }
  });
};

export default getUrl;
