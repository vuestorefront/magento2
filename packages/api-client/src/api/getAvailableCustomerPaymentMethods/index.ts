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

  try {
    return await context.client.query<CustomerAvailablePaymentMethodsQuery>({
      query: paymentMethods.query,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }
};
