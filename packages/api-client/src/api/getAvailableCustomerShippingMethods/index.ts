import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';

import { Context } from '../../types/context';
import CustomerAvailableShippingMethods from './CustomerShippingMethods';
import {
  CustomerAvailableShippingMethodsQuery,
} from '../../types/GraphQL';

/**
 * Retrive available shipping methods for current customer
 * @param context VSF Context
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 */
export default async function getAvailableCustomerShippingMethods(
  context: Context,
  customQuery: CustomQuery = { shippingMethods: 'shippingMethods' },
): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQuery>> {
  const { shippingMethods } = context.extendQuery(
    customQuery,
    {
      shippingMethods: {
        query: CustomerAvailableShippingMethods,
      },
    },
  );

  try {
    return await context.client.query<CustomerAvailableShippingMethodsQuery>({
      query: shippingMethods.query,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
