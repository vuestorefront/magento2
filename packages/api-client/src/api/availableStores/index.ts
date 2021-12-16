import { ApolloQueryResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/core';
import {
  AvailableStoresQuery,
} from '../../types/GraphQL';
import availableStores from './availableStores';
import { Context } from '../../types/context';

export default async (
  context: Context,
  customQuery: CustomQuery = { availableStores: 'availableStores' },
): Promise<ApolloQueryResult<AvailableStoresQuery>> => {
  const { availableStores: availableStoresGQL } = context.extendQuery(
    customQuery,
    {
      availableStores: {
        query: availableStores,
      },
    },
  );

  return context.client.query<AvailableStoresQuery>({
    query: availableStoresGQL.query,
  });
};
