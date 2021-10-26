import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { GetCustomerAddressesQuery } from '../../types/GraphQL';
import getCustomerAddressesQuery from './getCustomerAddresses';
import { Context } from '../../types/context';

export default async (
  context: Context,
  customQuery: CustomQuery = { getCustomerAddresses: 'getCustomerAddresses' },
): Promise<ApolloQueryResult<GetCustomerAddressesQuery>> => {
  const { getCustomerAddresses } = context.extendQuery(
    customQuery,
    {
      getCustomerAddresses: {
        query: getCustomerAddressesQuery,
      },
    },
  );

  try {
    return await context.client.query<GetCustomerAddressesQuery>({
      query: getCustomerAddresses.query,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
