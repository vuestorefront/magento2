import { ApolloQueryResult } from 'apollo-client';
import { CartQuery } from '../../types/GraphQL';
import query from './query';
import { Context } from '../../types/context';

const customerCart = async ({ client }: Context): Promise<ApolloQueryResult<CartQuery>> => client.query({
  query,
  fetchPolicy: 'no-cache',
});

export default customerCart;
