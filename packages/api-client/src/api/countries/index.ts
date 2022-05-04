import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CountriesListQuery } from '../../types/GraphQL';
import countriesListQuery from './countriesList';
import { Context } from '../../types/context';

/**
 * Loads the list of countries
 * @param context VSF Context
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 */
export default async function countries(
  context: Context,
  customQuery: CustomQuery = { countries: 'countries' },
): Promise<ApolloQueryResult<CountriesListQuery>> {
  const { countries: countriesGQL } = context.extendQuery(
    customQuery,
    {
      countries: {
        query: countriesListQuery,
      },
    },
  );
  return context.client.query<CountriesListQuery>({
    query: countriesGQL.query,
  });
}
