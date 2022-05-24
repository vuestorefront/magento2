import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { StoreConfigQuery } from '../../types/GraphQL';
import storeConfigMutation from './storeConfig';
import { Context } from '../../types/context';

/**
 * Fetches the store configuration from the API
 * @param context VSF Context
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 */
export default async function storeConfig(
  context: Context,
  customQuery: CustomQuery = { storeConfig: 'storeConfig' },
): Promise<ApolloQueryResult<StoreConfigQuery>> {
  const { storeConfig: storeConfigGQL } = context.extendQuery(
    customQuery,
    {
      storeConfig: {
        query: storeConfigMutation,
      },
    },
  );

  return context.client.query<StoreConfigQuery>({
    query: storeConfigGQL.query,
  });
}
