import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery, CustomerAvailablePaymentMethodsQuery } from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import { Context } from '../../types/context';
import CustomerAvailablePaymentMethods from './CustomerPaymentMethods';
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
