import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
import { ApolloQueryResult } from '@apollo/client';
import { Context } from '../../types/context';
import guestQuery from './GuestPaymentMethods.graphql';
import {
  GuestAvailablePaymentMethodsQuery,
  GuestAvailablePaymentMethodsQueryVariables,
} from '../../types/GraphQL';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery>> => {
  const defaultVariables = {
    cartId: params.cartId || '',
  };

  const { paymentMethods } = context.extendQuery(customQuery,
    {
      paymentMethods: {
        query: guestQuery,
        variables: defaultVariables,
      },
    });

  const query = customQuery ? gql`${paymentMethods.query}` : paymentMethods.query;

  try {
    return await context.client.query<GuestAvailablePaymentMethodsQuery, GuestAvailablePaymentMethodsQueryVariables>({
      query,
      variables: paymentMethods.variables,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }
};
