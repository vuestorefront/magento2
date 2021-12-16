import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CountriesListQuery } from '../../types/GraphQL';
import countriesList from './countriesList';
import { Context } from '../../types/context';

export default async (
  context: Context,
  customQuery: CustomQuery = { countries: 'countries' },
): Promise<ApolloQueryResult<CountriesListQuery>> => {
  const { countries: countriesGQL } = context.extendQuery(
    customQuery,
    {
      countries: {
        query: countriesList,
      },
    },
  );
  return context.client.query<CountriesListQuery>({
    query: countriesGQL.query,
  });
};
