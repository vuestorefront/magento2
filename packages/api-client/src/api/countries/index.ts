import { ApolloQueryResult } from 'apollo-client';
import { CountriesListQuery } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CountriesListQuery>> => client
  .query<CountriesListQuery>({
  query,
  fetchPolicy: 'no-cache',
});
