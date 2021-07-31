import { ApolloQueryResult } from '@apollo/client';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';

import { Context } from '../../types/context';
import CustomerAvailableShippingMethods from './CustomerShippingMethods';
import {
  CustomerAvailableShippingMethodsQuery,
} from '../../types/GraphQL';

export default async (
  context: Context,
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQuery>> => {
  const { shippingMethods } = context.extendQuery(customQuery,
    {
      shippingMethods: {
        query: CustomerAvailableShippingMethods,
      },
    });

  try {
    return await context.client.query<CustomerAvailableShippingMethodsQuery>({
      query: gql`${shippingMethods.query}`,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }
};
