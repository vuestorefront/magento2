import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
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
