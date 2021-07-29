import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
import { ApolloQueryResult } from '@apollo/client';
import { Context } from '../../types/context';
import customerQuery from './CustomerShippingMethods.graphql';
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
        query: customerQuery,
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
