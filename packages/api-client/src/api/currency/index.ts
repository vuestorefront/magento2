import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CurrencyQuery, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import currencyQuery from "./currency";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetch available currencies in a store.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch available currencies
 * const result = await sdk.magento.currency();
 *
 * // result would be something like:
 * // {
 * //   "data": {
 * //     "currency": {
 * //       "_currency_code": "EUR",
 * //       "_currency_symbol": "€",
 * //       "default_display_currency_code": "EUR",
 * //       "default_display_currency_symbol": "€",
 * //       "available_currency_codes": [
 * //         "EUR",
 * //         "USD"
 * //       ],
 * //       "exchange_rates": [
 * //         {
 * //           "currency_to": "EUR",
 *  //          "rate": 1
 *  //        },
 *  //        {
 *  //          "currency_to": "USD",
 *  //          "rate": 1.2
 *  //        }
 *  //      ]
 *  //    }
 *  //  }
 *  // }
 * ```
 *
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'currency-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query currency {
 *                currency{
 *                  ${metadata?.fields}
 *                }
 *              }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to fetch a list of currencies with limited number of fields
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   currency: 'currency-custom-query',
 *   metadata: {
 *     fields: '_currency_code'
 *   }
 * };
 *
 * const result = await sdk.magento.currency(customQuery);
 *
 * // result will contain only the _currency_code field
 * ```
 */
export async function currency(
  context: Context,
  customQuery: CustomQuery = { currency: "currency" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CurrencyQuery>> {
  const { currency: currencyGQL } = context.extendQuery(customQuery, {
    currency: {
      query: currencyQuery,
    },
  });

  return context.client.query<CurrencyQuery>({
    query: gql`
      ${currencyGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
