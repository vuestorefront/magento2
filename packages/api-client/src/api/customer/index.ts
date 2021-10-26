import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CustomerQuery } from '../../types/GraphQL';
import customer from './customer';
import { Context } from '../../types/context';

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
