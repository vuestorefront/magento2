import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { GetCustomerAddressesQuery } from '../../types/GraphQL';
import getCustomerAddressesQuery from './getCustomerAddresses';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Fetches customer addresses.
 *
 * @param context - VSF Context
 * @param [customQuery] - (optional) - custom GraphQL query that extends the default query
 */
export default async function getCustomerAddresses(
  context: Context,
  customQuery: CustomQuery = { getCustomerAddresses: 'getCustomerAddresses' },
): Promise<ApolloQueryResult<GetCustomerAddressesQuery>> {
  const { getCustomerAddresses: getCustomerAddressesGQL } = context.extendQuery(customQuery, {
    getCustomerAddresses: {
      query: getCustomerAddressesQuery,
    },
  });

  try {
    return await context.client.query<GetCustomerAddressesQuery>({
      query: getCustomerAddressesGQL.query,
      context: {
        headers: getHeaders(context),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
