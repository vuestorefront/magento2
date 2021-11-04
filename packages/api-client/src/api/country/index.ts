import { ApolloQueryResult } from 'apollo-client';
import { CountryInformationQuery, CountryInformationQueryVariables } from '../../types/GraphQL';
import countryInformation from './countryInformation';
import { Context } from '../../types/context';

export default async ({ client }: Context, id: string): Promise<ApolloQueryResult<CountryInformationQuery>> => client
  .query<CountryInformationQuery, CountryInformationQueryVariables>({
  query: countryInformation,
  variables: {
    id,
  },
});
