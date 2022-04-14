import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import {
  CurrencyQuery,
} from '../../types/GraphQL';
import currency from './currency';
import { Context } from '../../types/context';

/**
 * Fetches the currency information.
 *
 * @param context VSF context
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 */
export default async (
  context: Context,
  customQuery: CustomQuery = { currency: 'currency' },
): Promise<ApolloQueryResult<CurrencyQuery>> => {
  const { currency: currencyGQL } = context.extendQuery(
    customQuery,
    {
      currency: {
        query: currency,
      },
    },
  );

  return context.client.query<CurrencyQuery>({
    query: currencyGQL.query,
  });
};
