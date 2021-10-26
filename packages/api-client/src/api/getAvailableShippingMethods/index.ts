import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { Context } from '../../types/context';
import GuestAvailableShippingMethods from './GuestAvailableShippingMethods';
import {
  GuestAvailableShippingMethodsQuery,
  GuestAvailableShippingMethodsQueryVariables,
} from '../../types/GraphQL';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery: CustomQuery = { shippingMethods: 'shippingMethods' },
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
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
