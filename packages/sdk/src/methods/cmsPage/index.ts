import { CmsPageQueryVariables, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link cmsPage} method.
 */
export type CmsPageQuery = { cmsPage: Query['cmsPage'] };

/**
 * cmsPage response type
 */
export type CmsPageResponse<T extends DeepPartial<CmsPageQuery> = CmsPageQuery> = ApolloQueryResult<T>;

/**
 * Method to fetch CMS page
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/cmsPage | cmsPage } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/cmsPage | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CmsPageResponse | CmsPageResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch home page by the page identifier
 * const result = await sdk.magento.cmsPage({
 *   identifier: 'home'
 * });
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
 *         'cms-page-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query cmsPage($identifier: String) {
 *                cmsPage(identifier:$identifier) {
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
 * // reduce the amount of fields to only the content and title
 * const customQuery = {
 *   cmsPage: 'cms-page-custom-query',
 *   metadata: {
 *     fields: 'title content'
 *   }
 * };
 *
 * const result = await sdk.magento.cmsPage({
 *   identifier: 'home'
 * }, { customQuery });
 *
 * // result will only contain the title and content fields
 * ```
 */
export async function cmsPage<RES extends CmsPageResponse>(
  params: CmsPageQueryVariables,
  options?: MethodOptions<CustomQuery<'cmsPage'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('cmsPage')
    .setMethod('GET')
    .setProps([params.identifier, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
