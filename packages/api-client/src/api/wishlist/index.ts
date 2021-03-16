import { wishlistOutput } from '../../types/GraphQL';
import query from './query';
import { ApolloQueryResult } from 'apollo-client';

const wishlist = async ({ client }): Promise<ApolloQueryResult<wishlistOutput>> => {

  return await client.query({
    query: query,
    fetchPolicy: 'no-cache'
  });
};
export default wishlist;
