import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery, StoreConfigQuery } from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import storeConfigMutation from './storeConfig';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Fetches the store configuration from the API
 * @param context VSF Context
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function storeConfig(
  context: Context,
  customQuery: CustomQuery = { storeConfig: 'storeConfig' },
  customHeaders: CustomHeaders = {},
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
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
