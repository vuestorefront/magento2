import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import revokeCustomerToken from './revokeCustomerToken';
import { Context } from '../../types/context';
import { RevokeCustomerTokenMutation } from '../../types/GraphQL';

/**
 * Logs out the current customer. To override the default query, use the `revokeCustomerToken` query key.
 */
export default async (
  context: Context,
  customQuery: CustomQuery = { revokeCustomerToken: 'revokeCustomerToken' },
): Promise<FetchResult<RevokeCustomerTokenMutation>> => {
  const { revokeCustomerToken: revokeCustomerTokenGQL } = context.extendQuery(customQuery, {
    revokeCustomerToken: {
      query: revokeCustomerToken,
    },
  });

  return context.client.mutate<RevokeCustomerTokenMutation>({
    mutation: revokeCustomerTokenGQL.query,
  });
};
