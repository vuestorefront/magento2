import { ApolloQueryResult } from 'apollo-client';
import { CustomerOrdersQuery } from '../../types/GraphQL';
import query from './query';
import { Context } from '../../types/context';

const orders = async ({ client }: Context): Promise<ApolloQueryResult<CustomerOrdersQuery>> => client.query({
  query,
  fetchPolicy: 'no-cache',
});

export default orders;
