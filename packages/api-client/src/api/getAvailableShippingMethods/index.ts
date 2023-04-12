import { ApolloQueryResult } from '@apollo/client/core';
import {
  CustomQuery,
  GuestAvailableShippingMethodsQuery,
  GuestAvailableShippingMethodsQueryVariables,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import { Context } from '../../types/context';
import GuestAvailableShippingMethods from './GuestAvailableShippingMethods';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery: CustomQuery = { shippingMethods: 'shippingMethods' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQuery>> => {
  const { shippingMethods } = context.extendQuery(
    customQuery,
    {
      shippingMethods: {
        query: GuestAvailableShippingMethods,
        variables: { ...params },
      },
    },
  );

  try {
    return await context.client.query<GuestAvailableShippingMethodsQuery,
    GuestAvailableShippingMethodsQueryVariables>({
      query: shippingMethods.query,
      variables: shippingMethods.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
