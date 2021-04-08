import { ApolloQueryResult } from 'apollo-client';
import { WishlistOutput } from '../../types/GraphQL';
import query from './query';
import { Context } from '../../types/context';

const wishlist = async ({ client }: Context): Promise<ApolloQueryResult<WishlistOutput>> => client.query({
  query,
  fetchPolicy: 'no-cache',
});
export default wishlist;
