import { Query } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * query type for the {@link productReviewRatingsMetadata} method.
 */
export type ProductReviewRatingsMetadataQuery = { productReviewRatingsMetadata: Query['productReviewRatingsMetadata'] };

/**
 * productReviewRatingsMetadata response type
 */
export type ProductReviewRatingsMetadataResponse<
  T extends DeepPartial<ProductReviewRatingsMetadataQuery> = ProductReviewRatingsMetadataQuery,
> = ApolloQueryResult<T>;

/**
 * Method to get the active ratings attributes and the values each rating can have.
 *
 * @remarks
 * This method sends a GET request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/productReviewRatingsMetadata | productReviewRatingsMetadata } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/productReviewRatingsMetadata | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/ProductReviewRatingsMetadataResponse | ProductReviewRatingsMetadataResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch the active ratings attributes and the values each rating can have
 * const { data } = await sdk.magento.productReviewRatingsMetadata();
 *
 * data.productReviewRatingsMetadata.items; // array of review's attributes
 * data.productReviewRatingsMetadata.items[0].values; // array of possible values of the review's attributes
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
 *         'product-review-ratings-metadata-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query productReviewRatingsMetadata {
 *                productReviewRatingsMetadata {
 *                  items {
 *                    ${metadata.fields}
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
 * Using a custom GraphQL query to reduce the amount of data returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   productReviewRatingsMetadata: 'product-review-ratings-metadata-custom-query',
 *   metadata: {
 *     fields: `
 *      name
 *      values {
 *        value
 *      }
 *     `
 *   }
 * };
 *
 * const { data } = await sdk.magento.productReviewRatingsMetadata({ customQuery });
 *
 * // data.productReviewRatingsMetadata.items[0] will contain only the fields specified in the custom query.
 * ```
 */
export async function productReviewRatingsMetadata<RES extends ProductReviewRatingsMetadataResponse>(
  options?: MethodOptions<CustomQuery<'productReviewRatingsMetadata'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('productReviewRatingsMetadata')
    .setMethod('GET')
    .setProps([options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
