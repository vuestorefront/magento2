import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { Context } from '../../types/context';
import CustomerAvailablePaymentMethods from './CustomerPaymentMethods';
import { CustomerAvailablePaymentMethodsQuery } from '../../types/GraphQL';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery: CustomQuery = { paymentMethods: 'paymentMethods' },
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

    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
