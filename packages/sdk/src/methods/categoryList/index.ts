import { CustomQuery, MethodOptions } from '../../types';
import { CategoryListQuery, CategoryListQueryVariables } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * Category list response type
 */
export type CategoryListResponse<T extends DeepPartial<CategoryListQuery> = CategoryListQuery> = ApolloQueryResult<T>

/**
 * Method to list of all categories without filters
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.categoryList | categoryList} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#categoryList | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#CategoryListResponse | CategoryListResponse}.
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
export async function categoryList<RES extends CategoryListResponse>(params: CategoryListQueryVariables, options?: MethodOptions<CustomQuery<'categoryList'>>) {
  const { data } = await client.post<RES>(
    'categoryList',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
