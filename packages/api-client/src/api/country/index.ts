import { ApolloQueryResult } from 'apollo-client';
import { CountryInformationQuery, CountryInformationQueryVariables } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context, id: string): Promise<ApolloQueryResult<CountryInformationQuery>> => client
  .query<CountryInformationQuery, CountryInformationQueryVariables>({
  query,
  variables: {
    id,
  },
  fetchPolicy: 'no-cache',
});
