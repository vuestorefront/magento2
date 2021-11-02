import { ApolloQueryResult } from '@apollo/client';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
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
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQuery>> => {
  const defaultVariables = params ? {
    cart_id: params.cartId,
  } : {};

  const { shippingMethods } = context.extendQuery(customQuery,
    {
      shippingMethods: {
        query: GuestAvailableShippingMethods,
        variables: defaultVariables,
      },
    });

  try {
    return await context.client.query<GuestAvailableShippingMethodsQuery,
    GuestAvailableShippingMethodsQueryVariables>({
      query: gql`${shippingMethods.query}`,
      variables: shippingMethods.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
