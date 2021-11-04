import { ApolloQueryResult } from 'apollo-client';
import { CustomerQuery } from '../../types/GraphQL';
import customer from './customer';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CustomerQuery>> => client
  .query<CustomerQuery>({
  query: customer,
});
