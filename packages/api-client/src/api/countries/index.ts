import { ApolloQueryResult } from '@apollo/client/core';
import type { CustomHeaders } from '@vue-storefront/magento-types';
import { CountriesListQuery, CustomQuery } from '@vue-storefront/magento-types';
import gql from 'graphql-tag';
import countriesListQuery from './countriesList';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Loads the list of countries
 * @param context VSF Context
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function countries(
  context: Context,
  customQuery: CustomQuery = { countries: 'countries' },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CountriesListQuery>> {
  const { countries: countriesGQL } = context.extendQuery(customQuery, {
    countries: {
      query: countriesListQuery,
    },
  });
  return context.client.query<CountriesListQuery>({
    query: gql`
      ${countriesGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
