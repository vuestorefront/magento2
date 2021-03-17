import { customerQuery } from '../../types/GraphQL';
import query from './query';
import { ApolloQueryResult } from 'apollo-client';

const customer = async ({ client }): Promise<ApolloQueryResult<customerQuery>> => {

  return await client.query({
    query,
    fetchPolicy: 'no-cache'
  });
};

export default customer;
