import { QueryCategoriesArgs, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link categories} method.
 */
export type CategoriesQuery = { categories: Query['categories'] };

/**
 * Category result response type
 */
export type CategoriesResponse<T extends DeepPartial<CategoriesQuery> = CategoriesQuery> = ApolloQueryResult<T>;

/**
 * Method to list of all categories matching specified filters
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/categories | categories} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/categories | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/categoriesResponse | categoriesResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of categories with default parameters
 * const categories = await sdk.magento.categories({});
 * ```
 *
 * @example
 * Creating a custom GraphQL query for fetching categories.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'categories-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query categories {
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
 * Using a custom GraphQL query to fetch categories.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  categories: 'categories-custom-query',
 *    metadata: {
 *      fields: 'items { uid name }'
 *    }
 * };
 *
 * const categories = await sdk.magento.categories({}, { customQuery });
 *
 * // Category list will contain only the fields specified in the custom query.
 * ```
 */
export async function categories<RES extends CategoriesResponse>(
  params: QueryCategoriesArgs,
  options?: MethodOptions<CustomQuery<'categories'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('categories')
    .setMethod('GET')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
