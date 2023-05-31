import { CustomQuery, MethodOptions } from '../../types';
import { Query } from '@vue-storefront/magento-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * query type for the {@link countries} method.
 */
export type CountriesQuery = { countries: Query['countries'] };

/**
 * countries response type
 */
export type CountriesResponse<T extends DeepPartial<CountriesQuery> = CountriesQuery> = ApolloQueryResult<T>

/**
 * Method to fetch list of countries
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.countries | countries } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#countries | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#CountriesResponse | CountriesResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of countries
 * const result = await sdk.magento.countries();
 *
 * // result.data.countries is an array of countries
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
 *         'countries-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query countriesList {
 *                countries {
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
 * Using a custom GraphQL query to reduce the amount of fields returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   countries: 'countries-custom-query',
 *   metadata: {
 *     fields: 'full_name_english'
 *   }
 * };
 *
 * const result = await sdk.magento.countries({ customQuery });
 *
 * // result.data.countries will only contain the full_name_english field
 * ```
 */
export async function countries<RES extends CountriesResponse>(options?: MethodOptions<CustomQuery<'countries'>>) {
  const { data } = await client.post<RES>(
    'countries',
    [options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
