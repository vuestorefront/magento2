import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/middleware';
import { CurrencyQuery } from '../../types/GraphQL';
import currencyQuery from './currency';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

/**
 * Fetches the currency information.
 *
 * @param context VSF context
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function currency(
  context: Context,
  customQuery: CustomQuery = { currency: 'currency' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CurrencyQuery>> {
  const { currency: currencyGQL } = context.extendQuery(customQuery, {
    currency: {
      query: currencyQuery,
    },
  });

  return context.client.query<CurrencyQuery>({
    query: currencyGQL.query,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
