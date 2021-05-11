import { CustomQuery } from '@vue-storefront/core';
import { ApolloQueryResult } from '@apollo/client';
import { Context } from '../../types/context';
import guestQuery from './GuestPaymentMethods.graphql';
import customerQuery from './CustomerPaymentMethods.graphql';
import {
  CustomerAvailablePaymentMethodsQuery,
  GuestAvailablePaymentMethodsQuery,
  GuestAvailablePaymentMethodsQueryVariables,
} from '../../types/GraphQL';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery | CustomerAvailablePaymentMethodsQuery>> => {
  const defaultVariables = params ? {
    cart_id: params.cartId,
  } : { };

  const { paymentMethods } = context.extendQuery(customQuery,
    {
      paymentMethods: {
        query: defaultVariables.cart_id ? guestQuery : customerQuery,
        variables: defaultVariables,
      },
    });

  try {
    return await context.client.query<
    GuestAvailablePaymentMethodsQuery | CustomerAvailablePaymentMethodsQuery,
    GuestAvailablePaymentMethodsQueryVariables | {}>({
      query: paymentMethods.query,
      variables: paymentMethods.variables,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }
};
