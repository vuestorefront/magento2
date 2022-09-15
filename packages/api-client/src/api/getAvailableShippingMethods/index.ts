import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { Context } from '../../types/context';
import GuestAvailableShippingMethods from './GuestAvailableShippingMethods';
import {
  GuestAvailableShippingMethodsQuery,
  GuestAvailableShippingMethodsQueryVariables,
} from '../../types/GraphQL';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery: CustomQuery = { shippingMethods: 'shippingMethods' },
  customHeaders: Record<string, string> = {},
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
