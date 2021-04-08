import { ApolloQueryResult } from 'apollo-client';
import { CartQuery } from '../../types/GraphQL';
import query from './query';
import { Context } from '../../types/context';

const getCart = async ({ client }: Context, cartId: string): Promise<ApolloQueryResult<CartQuery>> => client.query({
  query,
  variables: { cartId },
  fetchPolicy: 'no-cache',
});

export default getCart;
