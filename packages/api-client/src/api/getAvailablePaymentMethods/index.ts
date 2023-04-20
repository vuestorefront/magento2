import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vsf-enterprise/magento-api-types';
import type { GuestAvailablePaymentMethodsQuery, GuestAvailablePaymentMethodsQueryVariables, CustomHeaders } from '@vsf-enterprise/magento-api-types';
import { Context } from '../../types/context';
import GuestAvailablePaymentMethods from './GuestAvailablePaymentMethods';
import getHeaders from '../getHeaders';

/**
 * Fetches the available payment methods for the received cart.
 *
 * @param context VSF context
 * @param params params containing the cart's ID
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function getAvailablePaymentMethods(
  context: Context,
  params: {
    cartId: string;
  },
  customQuery: CustomQuery = { paymentMethods: 'paymentMethods' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery>> {
  const defaultVariables = {
    cartId: params.cartId || '',
  };

  const { paymentMethods } = context.extendQuery(customQuery, {
    paymentMethods: {
      query: GuestAvailablePaymentMethods,
      variables: defaultVariables,
    },
  });

  try {
    return await context.client.query<GuestAvailablePaymentMethodsQuery, GuestAvailablePaymentMethodsQueryVariables>({
      query: paymentMethods.query,
      variables: paymentMethods.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
