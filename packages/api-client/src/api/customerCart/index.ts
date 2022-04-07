import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { Context } from '../../types/context';
import { CustomerCartQuery } from '../../types/GraphQL';
import customerCartQuery from './customerCart';

/**
 * Fetches the cart of the current logged in user
 * @param context VSF context
 * @param customQuery custom GraphQL query that extends the default one
 */
export default async function customerCart(
  context: Context,
  customQuery: CustomQuery = { customerCart: 'customerCart' },
): Promise<ApolloQueryResult<CustomerCartQuery>> {
  const { customerCart: customerCartGQL } = context.extendQuery(
    customQuery,
    {
      customerCart: {
        query: customerCartQuery,
      },
    },
  );

  return context.client.query<CustomerCartQuery>({
    query: customerCartGQL.query,
  });
}
