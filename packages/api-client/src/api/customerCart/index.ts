import { cartQuery } from '../../types/GraphQL';
import query from './query';
import { ApolloQueryResult } from 'apollo-client';

const customerCart = async ({ client }): Promise<ApolloQueryResult<cartQuery>> => {

  return await client.query({
    query: query,
    fetchPolicy: 'no-cache'
  });
};

export default customerCart;
