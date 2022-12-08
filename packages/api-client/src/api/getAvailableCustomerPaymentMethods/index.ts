import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import CustomerAvailablePaymentMethods from './CustomerPaymentMethods';
import { CustomerAvailablePaymentMethodsQuery } from '../../types/GraphQL';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery: CustomQuery = { paymentMethods: 'paymentMethods' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQuery>> => {
  const { paymentMethods } = context.extendQuery(
    customQuery,
    {
      paymentMethods: {
        query: CustomerAvailablePaymentMethods,
      },
    },
  );

  try {
    return await context.client.query<CustomerAvailablePaymentMethodsQuery>({
      query: paymentMethods.query,
      context: {
        headers: getHeaders(context, customHeaders),
      },

    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
