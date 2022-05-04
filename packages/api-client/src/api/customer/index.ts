import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CustomerQuery } from '../../types/GraphQL';
import customer from './customer';
import { Context } from '../../types/context';

/**
 * Returns the information about the current customer. To override the default query, use the `customer` query key.
 */
export default async (
  context: Context,
  customQuery: CustomQuery = { customer: 'customer' },
): Promise<ApolloQueryResult<CustomerQuery>> => {
  const { customer: customerGQL } = context.extendQuery(
    customQuery,
    {
      customer: {
        query: customer,
      },
    },
  );

  return context.client.query<CustomerQuery>({
    query: customerGQL.query,
  });
};
