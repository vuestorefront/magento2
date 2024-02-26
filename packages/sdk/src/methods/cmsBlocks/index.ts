import { CmsBlockQueryVariables, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link cmsBlocks} method.
 */
export type CmsBlockQuery = { cmsBlocks: Query['cmsBlocks'] };

/**
 * cmsBlocks response type
 */
export type CmsBlocksResponse<T extends DeepPartial<CmsBlockQuery> = CmsBlockQuery> = ApolloQueryResult<T>;

/**
 * Method to fetch cms blocks.
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/cmsBlocks | cmsBlocks } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/cmsBlocks | here}.
 *
 * @param params -
 * Parameter object which can be used with this method.
 * Refer to its type definition to learn about possible properties.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CmsBlocksResponse | CmsBlocksResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch few cms blocks by their identifiers
 * const { data } = await sdk.magento.cmsBlocks({
 *   identifiers: ['id1', 'id2']
 * });
 *
 * // result will contain cms blocks with the specified identifiers
 * data.cmsBlocks.items.forEach(block => console.log(block.identifier));
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
 *         'cms-blocks-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query cmsBlock($identifiers: [String]) {
 *                cmsBlocks(identifiers: $identifiers) {
 *                  items {
 *                    ${metadata.fields}
 *                  }
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
 * // fetch only title
 * const customQuery = {
 *   cmsBlocks: 'cms-blocks-custom-query',
 *   metadata: {
 *     fields: 'title'
 *   }
 * };
 *
 * const { data } = await sdk.magento.cmsBlocks({
 *   identifiers: ['id1', 'id2']
 * }, { customQuery });
 *
 * // data will contain only block titles
 * ```
 */
export async function cmsBlocks<RES extends CmsBlocksResponse>(
  params: CmsBlockQueryVariables,
  options?: MethodOptions<CustomQuery<'cmsBlocks'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('cmsBlocks')
    .setMethod('GET')
    .setProps([params.identifiers, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
