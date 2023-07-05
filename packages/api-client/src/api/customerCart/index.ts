import { ApolloQueryResult } from '@apollo/client/core';
import type { CustomerCartQuery, CustomHeaders, CustomQuery } from '@vue-storefront/magento-types';
import gql from 'graphql-tag';
import type { Context } from '../../types/context';
import customerCartQuery from './customerCart';
import getHeaders from '../getHeaders';

/**
 * Fetches the cart of the current logged in user
 * @param context VSF context
 * @param customQuery custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function customerCart(
  context: Context,
  customQuery: CustomQuery = { customerCart: 'customerCart' },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CustomerCartQuery>> {
  const { customerCart: customerCartGQL } = context.extendQuery(customQuery, {
    customerCart: {
      query: customerCartQuery,
    },
  });

  return context.client.query<CustomerCartQuery>({
    query: gql`
      ${customerCartGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
