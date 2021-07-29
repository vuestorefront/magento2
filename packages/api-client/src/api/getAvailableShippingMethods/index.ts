import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
import { ApolloQueryResult } from '@apollo/client';
import { Context } from '../../types/context';
import guestQuery from './GuestShippingMethods.graphql';
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
        query: guestQuery,
        variables: defaultVariables,
      },
    });

  const query = customQuery ? gql`${shippingMethods.query}` : shippingMethods.query;

  try {
    return await context.client.query<GuestAvailableShippingMethodsQuery,
    GuestAvailableShippingMethodsQueryVariables>({
      query,
      variables: shippingMethods.variables,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }
};
