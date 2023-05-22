import { CustomQuery, MethodOptions } from '../../types';
import { AvailableStoresQuery } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * availableStores response type
 */
export type AvailableStoresResponse<T extends DeepPartial<AvailableStoresQuery> = AvailableStoresQuery> = ApolloQueryResult<T>

/**
 * Method to fetch available stores
 *
 * @remarks
 * This method communicates with the
 * {@link @vue-storefront/magento-api#ApiMethods.availableStores | availableStores } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vue-storefront/magento-api#availableStores | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#AvailableStoresResponse | AvailableStoresResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch available stores
 * const result = await sdk.magento.availableStores();
 *
 * // result.data.availableStores contains the available stores
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
 *         'available-stores-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query availableStores {
 *                availableStores {
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
 *   availableStores: 'available-stores-custom-query',
 *   metadata: {
 *     fields: 'code store_name'
 *   }
 * };
 *
 * const result = await sdk.magento.availableStores({ customQuery });
 *
 * // result.data.availableStores contains the available stores with only the fields specified in the custom query
 * ```
 */
export async function availableStores<RES extends AvailableStoresResponse>(options?: MethodOptions<CustomQuery<'availableStores'>>) {
  const { data } = await client.post<RES>(
    'availableStores',
    [options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
