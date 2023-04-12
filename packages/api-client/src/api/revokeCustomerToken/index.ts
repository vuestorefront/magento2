import { FetchResult } from '@apollo/client/core';
import { CustomQuery, RevokeCustomerTokenMutation } from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import revokeCustomerToken from './revokeCustomerToken';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Logs out the current customer. To override the default query, use the `revokeCustomerToken` query key.
 */
export default async (
  context: Context,
  customQuery: CustomQuery = { revokeCustomerToken: 'revokeCustomerToken' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<RevokeCustomerTokenMutation>> => {
  const { revokeCustomerToken: revokeCustomerTokenGQL } = context.extendQuery(customQuery, {
    revokeCustomerToken: {
      query: revokeCustomerToken,
    },
  });

  return context.client.mutate<RevokeCustomerTokenMutation>({
    mutation: revokeCustomerTokenGQL.query,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
