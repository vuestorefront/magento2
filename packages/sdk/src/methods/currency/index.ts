import { CustomQuery, MethodOptions } from '../../types';
import { CurrencyQuery } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * currency response type
 */
export type CurrencyResponse<T extends DeepPartial<CurrencyQuery> = CurrencyQuery> = ApolloQueryResult<T>

/**
 * Method to fetch available currencies in a store.
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.currency | currency } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#currency | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#CurrencyResponse | CurrencyResponse}.
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
 * //       "base_currency_code": "EUR",
 * //       "base_currency_symbol": "€",
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
 *     fields: 'base_currency_code'
 *   }
 * };
 *
 * const result = await sdk.magento.currency({ customQuery });
 *
 * // result will contain only the base_currency_code field
 * ```
 */
export async function currency<RES extends CurrencyResponse>(options?: MethodOptions<CustomQuery<'currency'>>) {
  const { data } = await client.post<RES>(
    'currency',
    [options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
