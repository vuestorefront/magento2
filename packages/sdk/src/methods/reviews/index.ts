import { CustomQuery, MethodOptions } from '../../types';
import { CustomerProductReviewParams, CustomerProductReviewQuery } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * reviews response type
 */
export type ReviewsResponse<T extends DeepPartial<CustomerProductReviewQuery> = CustomerProductReviewQuery> = ApolloQueryResult<T>

/**
 * Method to fetch customer reviews
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-storefront/magento-api#ApiMethods.reviews | reviews } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#reviews | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#reviewsResponse | reviewsResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch reviews, customer must be logged in
 * const result = await sdk.magento.reviews();
 *
 * // log all reviews
 * result?.data?.customer?.reviews?.items.forEach(review => console.log(review));
 * ```
 *
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'customer-product-review-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query reviews($pageSize: Int = 10, $currentPage: Int = 1) {
 *                customer {
 *                  reviews(pageSize: $pageSize, currentPage: $currentPage) {
 *                    ${metadata?.fields}
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
 * Using a custom GraphQL query to reduce the amount of fields returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * // fetch only text
 *
 * const customQuery = {
 *   reviews: 'customer-product-review-custom-query',
 *   metadata: {
 *     fields: 'items { text }'
 *   }
 * };
 *
 * const result = await sdk.magento.reviews({}, { customQuery });
 *
 * // result will only contain the text of the reviews
 * result?.data?.customer?.reviews?.items.forEach(review => console.log(review.text));
 * ```
 */
export async function reviews<RES extends ReviewsResponse>(params?: CustomerProductReviewParams, options?: MethodOptions<CustomQuery<'reviews'>>) {
  const { data } = await client.post<RES>(
    'reviews',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
