import type { GetProductSearchParams } from '@vue-storefront/magento-types';
import { Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import type { CustomQuery, MethodOptions } from '../../types';
import { client } from '../../client';

/**
 * query type for the {@link products} method.
 */
export type ProductsListQuery = { products: Query['products'] };

/**
 * Products list response type
 */
export type ProductsListResponse<T extends DeepPartial<ProductsListQuery> = ProductsListQuery> = ApolloQueryResult<T>;

/**
 * Method to get products
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/products | products} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vue-storefront/magento-types#productsListQuery | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/ProductsListResponse | ProductsListResponse}.
 *
 * @example
 * Simple usage without filters, sorting or pagination:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of products with default parameters
 * const details = await sdk.magento.products({});
 * ```
 *
 * @example
 * Usage with filters, sorting and pagination:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of products with custom parameters
 * const details = await sdk.magento.products({
 *  pageSize: 20,
 *  currentPage: 1,
 *  filter: {
 *    sku: {
 *      eq: PRODUCT_SKU
 *    }
 *  }
 * });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for fetching products.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'products-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query productsList(
 *                $search: String = "",
 *                $filter: ProductAttributeFilterInput,
 *                $pageSize: Int = 10,
 *                $currentPage: Int = 1,
 *                $sort: ProductAttributeSortInput
 *              ) {
 *                products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
 *                  ${metadata.fields}
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
 * Using a custom GraphQL query to fetch products list.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  products: 'products-custom-query',
 *    metadata: {
 *      fields: 'items { sku name }'
 *    }
 * };
 *
 * const products = await sdk.magento.products({
 *  filter: {
 *    sku: {
 *      eq: 'some-sku' // optional SKU filter
 *    }
 *  }
 * }, { customQuery });
 *
 * // Products will contain only the fields specified in the custom query.
 * ```
 */
export async function products<RES extends ProductsListResponse>(
  params: GetProductSearchParams,
  options?: MethodOptions<CustomQuery<'products'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('products')
    .setMethod('GET')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
