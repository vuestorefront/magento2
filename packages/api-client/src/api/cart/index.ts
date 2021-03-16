import { cartQuery } from '../../types/GraphQL';
import { ApolloQueryResult } from 'apollo-client';
import query from './query';

const getCart = async ({ client }, cartId: string): Promise<ApolloQueryResult<cartQuery>> => {
  const data = await client.query({
    query: query,
    variables: { cartId },
    fetchPolicy: 'no-cache'
  });
  return data;
};

export default getCart;
