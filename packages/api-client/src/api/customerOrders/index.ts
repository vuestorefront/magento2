import { customerOrdersQuery } from '../../types/GraphQL';
import query from './query';
import { ApolloQueryResult } from 'apollo-client';

const orders = async ({ client }): Promise<ApolloQueryResult<customerOrdersQuery>> => {
  return await client.query({
    query,
    fetchPolicy: 'no-cache'
  })
};

export default orders;
