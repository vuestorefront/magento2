import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
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
  customQuery: CustomQuery = { paymentMethods: 'paymentMethods' },
): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery>> => {
  const defaultVariables = {
    cartId: params.cartId || '',
  };

  const { paymentMethods } = context.extendQuery(
    customQuery,
    {
      paymentMethods: {
        query: GuestAvailablePaymentMethods,
        variables: defaultVariables,
      },
    },
  );

  return await context.client.query<GuestAvailablePaymentMethodsQuery, GuestAvailablePaymentMethodsQueryVariables>({
    query: paymentMethods.query,
    variables: paymentMethods.variables,
  });
};
