import { ApolloQueryResult } from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import { CustomerCartQuery } from '../../types/GraphQL';
import customerCart from './customerCart';
import { Context } from '../../types/context';

export default async (
  context: Context,
  customQuery: CustomQuery = { customerCart: 'customerCart' },
): Promise<ApolloQueryResult<CustomerCartQuery>> => {
  const { customerCart: customerCartGQL } = context.extendQuery(
    customQuery,
    {
      customerCart: {
        query: customerCart,
      },
    },
  );

  return context.client.query<CustomerCartQuery>({
    query: customerCartGQL.query,
  });
};
