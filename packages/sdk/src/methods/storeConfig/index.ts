import { Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link storeConfig} method.
 */
export type StoreConfigQuery = { storeConfig: Query['storeConfig'] };

/**
 * storeConfig response type
 */
export type StoreConfigResponse<T extends DeepPartial<StoreConfigQuery> = StoreConfigQuery> = ApolloQueryResult<T>;

/**
 * Method to fetch store configuration
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/storeConfig | storeConfig } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/storeConfig | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/StoreConfigResponse | StoreConfigResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch store configuration
 * const result = await sdk.magento.storeConfig();
 *
 * // result?.data?.storeConfig contains the store configuration
 * ```
 *
 * @example
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'store-config-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query storeConfig {
 *                storeConfig {
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
 * Using a custom GraphQL query to select only the fields you need
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // we want to fetch only logo related data
 * const customQuery = {
 *   storeConfig: 'store-config-custom-query',
 *   metadata: {
 *     fields: 'logo_alt logo_height logo_width'
 *   }
 * };
 *
 * const result = await sdk.magento.storeConfig({ customQuery });
 * ```
 */
export async function storeConfig<RES extends StoreConfigResponse>(
  options?: MethodOptions<CustomQuery<'storeConfig'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('storeConfig')
    .setMethod('GET')
    .setProps([options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
