import { ApolloQueryResult } from '@apollo/client';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
import { Context } from '../../types/context';
import GuestAvailablePaymentMethods from './GuestAvailablePaymentMethods';
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
        query: GuestAvailablePaymentMethods,
        variables: defaultVariables,
      },
    });

  try {
    return await context.client.query<GuestAvailablePaymentMethodsQuery, GuestAvailablePaymentMethodsQueryVariables>({
      query: gql`${paymentMethods.query}`,
      variables: paymentMethods.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
