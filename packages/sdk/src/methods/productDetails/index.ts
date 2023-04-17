import { client } from '../../client';
import type { CustomQuery, MethodOptions } from '../../types';
import { ProductDetailsResponse } from '../../types';
import type { GetProductSearchParams } from '@vsf-enterprise/magento-api-types';

/**
 * Method to get products details
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.productDetails | productDetails} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#productDetailsQuery | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#ProductDetailsResponse | ProductDetailsResponse}.
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
export async function productDetails<RES extends ProductDetailsResponse>(params: GetProductSearchParams, options?: MethodOptions<CustomQuery<'productDetails'>>) {
  const { data } = await client.post<RES>(
    'productDetails',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}

