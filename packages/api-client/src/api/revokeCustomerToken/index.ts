import { FetchResult } from '@apollo/client/core';
import type { CustomHeaders } from '@vue-storefront/magento-types';
import { RevokeCustomerTokenMutation } from '@vue-storefront/magento-types';
import gql from 'graphql-tag';
import revokeCustomerToken from './revokeCustomerToken';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Logs out the current customer. To override the default query, use the `revokeCustomerToken` query key.
 */
export default async (context: Context, customHeaders: CustomHeaders = {}): Promise<FetchResult<RevokeCustomerTokenMutation>> =>
  context.client.mutate<RevokeCustomerTokenMutation>({
    mutation: gql`
      ${revokeCustomerToken}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
