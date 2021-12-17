import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CountryInformationQuery, CountryInformationQueryVariables } from '../../types/GraphQL';
import countryInformation from './countryInformation';
import { Context } from '../../types/context';

export default async (
  context: Context,
  id: string,
  customQuery: CustomQuery = { country: 'country' },
): Promise<ApolloQueryResult<CountryInformationQuery>> => {
  const { country: countryGQL } = context.extendQuery(
    customQuery,
    {
      country: {
        query: countryInformation,
        variables: { id },
      },
    },
  );
  return context.client.query<CountryInformationQuery, CountryInformationQueryVariables>({
    query: countryGQL.query,
    variables: countryGQL.variables,
  });
};
