import { GetProductSearchParams, Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link productReview} method.
 */
export type ProductReviewQuery = { products: Query['products'] };

/**
 * productReview response type
 */
export type ProductReviewResponse<T extends DeepPartial<ProductReviewQuery> = ProductReviewQuery> =
  ApolloQueryResult<T>;

/**
 * Method to fetch product reviews
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/productReview | productReview } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/productReview | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/ProductReviewResponse | ProductReviewResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch all products reviews (default pagination limit is 10)
 * const result = await sdk.magento.productReview({});
 * ```
 * @example
 * Fetching reviews for a specific product:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const result = await sdk.magento.productReview({ filter: { sku: { eq: '24-MB01' } );
 * ```
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'product-review-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query productReview($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
 *                products(search: $search, filter: $filter, sort: $sort) {
 *                  items {
 *                    review_count
 *                    reviews(pageSize: $pageSize, currentPage: $currentPage) {
 *                      items {
 *                        ${metadata?.fields}
 *                      }
 *                    }
 *                  }
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
 * Using a custom GraphQL query to change the amount of fields returned by the query:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   productReview: 'product-review-custom-query',
 *   metadata: {
 *     fields: 'average_rating'
 *   }
 * };
 *
 * const result = await sdk.magento.productReview({}, { customQuery });
 *
 * // result.data.products.items[0].reviews.items[0] will only contain the average_rating field
 * ```
 */
export async function productReview<RES extends ProductReviewResponse>(
  params: GetProductSearchParams,
  options?: MethodOptions<CustomQuery<'productReview'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('productReview')
    .setMethod('GET')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
