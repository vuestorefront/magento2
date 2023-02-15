import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/middleware';
import { CountryInformationQuery, CountryInformationQueryVariables } from '../../types/GraphQL';
import countryInformation from './countryInformation';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

/**
 * Fetches the information about a country given its ID
 * @param context VSF Context
 * @param id ID of the country to be fetched
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function country(
  context: Context,
  id: string,
  customQuery: CustomQuery = { country: 'country' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CountryInformationQuery>> {
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
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
