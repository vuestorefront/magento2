import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import { GetCustomerAddressesQuery } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async (context: Context, customQuery?: CustomQuery): Promise<ApolloQueryResult<GetCustomerAddressesQuery>> => {
  const { getCustomerAddresses } = context.extendQuery(
    customQuery,
    {
      getCustomerAddresses: {
        query,
      },
    },
  );

  return context.client.query<GetCustomerAddressesQuery>({
    query: getCustomerAddresses.query,
    fetchPolicy: 'no-cache',
  });
};
