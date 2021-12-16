import { FetchResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/core';
import revokeCustomerToken from './revokeCustomerToken';
import { Context } from '../../types/context';
import { RevokeCustomerTokenMutation } from '../../types/GraphQL';

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
