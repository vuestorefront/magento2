import { Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link countries} method.
 */
export type CountriesQuery = { countries: Query['countries'] };

/**
 * countries response type
 */
export type CountriesResponse<T extends DeepPartial<CountriesQuery> = CountriesQuery> = ApolloQueryResult<T>;

/**
 * Method to fetch list of countries
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/countries | countries } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/countries | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CountriesResponse | CountriesResponse}.
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
  return new AxiosRequestSender(client)
    .setUrl('countries')
    .setMethod('GET')
    .setProps([options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
