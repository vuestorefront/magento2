import { CategoryListQueryVariables, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link categoryList} method.
 */
export type CategoryListQuery = { categories: Query['categories'] };

/**
 * Category list response type
 */
export type CategoryListResponse<T extends DeepPartial<CategoryListQuery> = CategoryListQuery> = ApolloQueryResult<T>;

/**
 * Method to list of all categories without filters
 * @deprecated Use `categories` method instead
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/categoryList | categoryList} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/categoryList | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CategoryListResponse | CategoryListResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of categories with default parameters
 * const categoryList = await sdk.magento.categoryList({});
 * ```
 *
 * @example
 * Creating a custom GraphQL query for adding product details.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'category-list-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query categoryList {
 *                 categories {
 *                   ${metadata.fields}
 *                 }
 *               }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to fetch product details.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  categoryList: 'category-list-custom-query',
 *    metadata: {
 *      fields: 'items { uid name }'
 *    }
 * };
 *
 * const categoryList = await sdk.magento.categoryList({}, { customQuery });
 *
 * // Category list will contain only the fields specified in the custom query.
 * ```
 */
export async function categoryList<RES extends CategoryListResponse>(
  params: CategoryListQueryVariables,
  options?: MethodOptions<CustomQuery<'categoryList'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('categoryList')
    .setMethod('GET')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
