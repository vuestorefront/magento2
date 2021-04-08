import { ApolloQueryResult } from 'apollo-client';
import { CustomerQuery } from '../../types/GraphQL';
import query from './query';
import { Context } from '../../types/context';

const customer = async ({ client }: Context): Promise<ApolloQueryResult<CustomerQuery>> => client.query({
  query,
  fetchPolicy: 'no-cache',
});

export default customer;
