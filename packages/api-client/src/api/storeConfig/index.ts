import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { StoreConfigQuery } from '../../types/GraphQL';
import storeConfig from './storeConfig';
import { Context } from '../../types/context';

export default async (
  context: Context,
  customQuery: CustomQuery = { storeConfig: 'storeConfig' },
): Promise<ApolloQueryResult<StoreConfigQuery>> => {
  const { storeConfig: storeConfigGQL } = context.extendQuery(
    customQuery,
    {
      storeConfig: {
        query: storeConfig,
      },
    },
  );

  return context.client.query<StoreConfigQuery>({
    query: storeConfigGQL.query,
  });
};
