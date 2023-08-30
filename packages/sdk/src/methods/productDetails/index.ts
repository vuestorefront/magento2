import type { GetProductSearchParams, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import type { CustomQuery, MethodOptions } from '../../types';
import { client } from '../../client';

/**
 * query type for the {@link productDetails} method.
 */
export type ProductDetailsQuery = { products: Query['products'] };

/**
 * Product details response type
 */
export type ProductDetailsResponse<T extends DeepPartial<ProductDetailsQuery> = ProductDetailsQuery> =
  ApolloQueryResult<T>;

/**
 * Method to get products details
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.productDetails | productDetails} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#productDetailsQuery | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ProductDetailsResponse | ProductDetailsResponse}.
 *
 * @example
 * Simple usage without filters, sorting or pagination:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of products with default parameters
 * const details = await sdk.magento.productDetails({});
 * ```
 *
 * @example
 * Usage with filters, sorting and pagination:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of products with custom parameters
 * const details = await sdk.magento.productDetails({
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
 * Creating a custom GraphQL query for adding product details.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'product-details-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query productDetails(
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
 * Using a custom GraphQL query to fetch product details.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  productDetails: 'product-details-custom-query',
 *    metadata: {
 *      fields: 'items { sku name }'
 *    }
 * };
 *
 * const details = await sdk.magento.productDetails({
 *  filter: {
 *    sku: {
 *      eq: 'some-sku' // optional SKU filter
 *    }
 *  }
 * }, { customQuery });
 *
 * // Details will contain only the fields specified in the custom query.
 * ```
 */
export async function productDetails<RES extends ProductDetailsResponse>(
  params: GetProductSearchParams,
  options?: MethodOptions<CustomQuery<'productDetails'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('productDetails')
    .setMethod('GET')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
