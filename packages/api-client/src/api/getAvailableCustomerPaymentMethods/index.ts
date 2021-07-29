import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
import { ApolloQueryResult } from '@apollo/client';
import { Context } from '../../types/context';
import customerQuery from './CustomerPaymentMethods.graphql';
import {
  CustomerAvailablePaymentMethodsQuery,
} from '../../types/GraphQL';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQuery>> => {
  const { paymentMethods } = context.extendQuery(customQuery,
    {
      paymentMethods: {
        query: customerQuery,
      },
    });

  const query = customQuery ? gql`${paymentMethods.query}` : paymentMethods.query;

  try {
    return await context.client.query<CustomerAvailablePaymentMethodsQuery>({
      query,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }
};
