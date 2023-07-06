import { ApolloQueryResult, gql } from '@apollo/client/core';
import { CustomQuery, CustomerQuery } from '@vue-storefront/magento-types';
import type { CustomHeaders } from '@vue-storefront/magento-types';
import customer from './customer';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Returns the information about the current customer. To override the default query, use the `customer` query key.
 */
export default async (
  context: Context,
  customQuery: CustomQuery = { customer: 'customer' },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CustomerQuery>> => {
  const { customer: customerGQL } = context.extendQuery(customQuery, {
    customer: {
      query: customer,
    },
  });

  return context.client.query<CustomerQuery>({
    query: gql`
      ${customerGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
