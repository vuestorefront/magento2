import type { GetProductSearchParams, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import type { CustomQuery, MethodOptions } from '../../types';
import { client } from '../../client';

/**
 * query type for the {@link relatedProducts} method.
 */
export type RelatedProductsQuery = { products: Query['products'] };

/**
 * Related product response
 */
export type RelatedProductsResponse<T extends DeepPartial<RelatedProductsQuery> = RelatedProductsQuery> =
  ApolloQueryResult<T>;

/**
 * Method to get related products
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/relatedProduct | relatedProduct} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/relatedProduct | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/RelatedProductsResponse | RelatedProductsResponse}.
 *
 * @example
 * Simple usage without filters, sorting or pagination:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Fetch list of products filtered by the SKU
 * // Only the parent product is affected by filters
 * const products = await sdk.magento.relatedProduct({
 *  pageSize: 1,
 *  filter: {
 *    sku: {
 *      eq: PRODUCT_SKU
 *    }
 *  }
 * });
 * ```
 *
 * @example
 * Usage with filters, sorting and pagination:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of products with custom parameters
 * const products = await sdk.magento.relatedProduct({
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
 * Creating a custom GraphQL query getting related products.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'related-product-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query relatedProduct(
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
 * Using a custom GraphQL query to fetch related products.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  relatedProduct: 'related-product-custom-query',
 *    metadata: {
 *      fields: 'items { related_products { uid __typename } }'
 *    }
 * };
 *
 * const result = await sdk.magento.relatedProduct({
 *  filter: {
 *    sku: {
 *      eq: 'some-sku' // optional SKU filter
 *    }
 *  }
 * }, { customQuery });
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
export async function relatedProducts<RES extends RelatedProductsResponse>(
  params: GetProductSearchParams,
  options?: MethodOptions<CustomQuery<'relatedProducts'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('relatedProducts')
    .setMethod('GET')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
