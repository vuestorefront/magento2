import { client } from '../../client';
import type { CustomQuery, MethodOptions } from '../../types';
import type { GetProductSearchParams } from '@vsf-enterprise/magento-api-types';
import { UpsellProductsQuery } from '@vsf-enterprise/magento-api-types';
import { ApolloQueryResult } from '@apollo/client';
import { DeepPartial } from 'ts-essentials';

/**
 * Upsell Products response type
 */
export type UpsellProductsResponse<T extends DeepPartial<UpsellProductsQuery> = UpsellProductsQuery> = ApolloQueryResult<T>

/**
 * Method to get upsell products for a given product.
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.upsellProducts | upsellProducts} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#upsellProductQuery | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#UpsellProductsResponse | UpsellProductsResponse}.
 *
 * @example
 * Simple usage without filters, sorting or pagination:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of upsell-products with default parameters
 * const upsellProducts = await sdk.magento.upsellProducts({});
 * ```
 *
 * @example
 * Usage with filters, sorting and pagination:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of products with upsell products
 * const upsellProducts = await sdk.magento.upsellProducts({
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
 * Creating a custom GraphQL query for getting upsellProducts.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'upsell-products-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query upsellProducts(
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
 * Using a custom GraphQL query to fetch upsell-products.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  upsellProducts: 'upsell-products-custom-query',
 *    metadata: {
 *      fields: 'items { sku name upsell_products { sku } }'
 *    }
 * };
 *
 * const upsellProducts = await sdk.magento.upsellProducts({
 *  filter: {
 *    sku: {
 *      eq: 'some-sku' // optional SKU filter
 *    }
 *  }
 * }, { customQuery });
 *
 * // upsellProducts will contain only the fields specified in the custom query.
 * ```
 */
export async function upsellProducts<RES extends UpsellProductsResponse>(params: GetProductSearchParams, options?: MethodOptions<CustomQuery<'upsellProducts'>>) {
  const { data } = await client.post<RES>(
    'upsellProducts',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}

