import { client } from '../../../src/client';
import { CategorySearchQueryVariables, CategoryTree } from '@vsf-enterprise/magento-api-types';
import { CustomQuery, MethodOptions } from 'src/types';
import type { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * Query that returns only CategoryList
 * `CategorySearchQuery` type from Magento doesn't include the important `children` prop
 */
export interface CategoryList {
  categoryList: CategoryTree[]
}

/**
 * Category search response type
 */
export type CategorySearchResponse<T extends DeepPartial<CategoryList> = CategoryList> = ApolloQueryResult<T>;

/**
 * Method to search categories
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.categorySearch | categorySearch} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#categorySearchQuery | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#CategorySearchResponse | CategorySearchResponse}.
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
export async function categorySearch<Res extends CategorySearchResponse>(
  params: CategorySearchQueryVariables = {},
  options?: MethodOptions<CustomQuery<'categorySearch'>>
) {
  const { data } = await client.post<Res>(
    'categorySearch',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
