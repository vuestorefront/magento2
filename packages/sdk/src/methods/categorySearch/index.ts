import { CategorySearchQueryVariables, CategoryTree } from '@vue-storefront/magento-types';
import type { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { CustomQuery, MethodOptions } from '../../types';
import { client } from '../../client';

/**
 * query type for the {@link categorySearch} method.
 */
export type CategorySearchQuery = {
  categoryList: CategoryTree[];
};

/**
 * Category search response type
 */
export type CategorySearchResponse<T extends DeepPartial<CategorySearchQuery> = CategorySearchQuery> =
  ApolloQueryResult<T>;

/**
 * Method to search categories
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/categorySearch | categorySearch} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/categorySearchQuery | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CategorySearchResponse | CategorySearchResponse}.
 *
 * @example
 * Simple usage without filters
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of categories with default parameters
 * const categories = await sdk.magento.categorySearch();
 * ```
 *
 * @example
 * Usage with filters
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of categories with custom parameters
 * const details = await sdk.magento.categorySearch({
 *  filters: {
 *    category_uid: {
 *      in: ['MjA=']
 *    }
 *  }
 * });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for searching categories
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'category-search-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
                query categorySearch($filters: CategoryFilterInput) {
                  categoryList(filters: $filters) {
                    ${metadata.fields}
                  }
                }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to search categories.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *    categorySearch: 'category-search-custom-query',
 *    metadata: {
 *      fields: 'children_count products { total_count }'
 *    }
 * };
 *
 * const result = await sdk.magento.categorySearch({
 *  filter: {
 *    category_uid: {
 *      in: ['=MjA']
 *    }
 *  }
 * }, { customQuery });
 *
 * // Details will contain only the fields specified in the custom query.
 * ```
 */
export async function categorySearch<RES extends CategorySearchResponse>(
  // eslint-disable-next-line default-param-last
  params: CategorySearchQueryVariables = {},
  options?: MethodOptions<CustomQuery<'categorySearch'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('categorySearch')
    .setMethod('GET')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
