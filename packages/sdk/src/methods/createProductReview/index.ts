import { MethodBaseOptions } from '../../types';
import { CreateProductReviewInput, CreateProductReviewMutation } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * createProductReview response type
 */
export type CreateProductReviewResponse<T extends DeepPartial<CreateProductReviewMutation> = CreateProductReviewMutation> = FetchResult<T>

/**
 * Method to create product review
 *
 * @remarks
 * This method communicates with the
 * {@link @vue-storefront/magento-api#ApiMethods.createProductReview | createProductReview } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vue-storefront/magento-api#createProductReview | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#CreateProductReviewResponse | CreateProductReviewResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // create review data structure
 * const review = {
 *  sku: 'some-sku',
 *  nickname: 'john.doe',
 *  summary: 'awesome thing, whatever it is!',
 *  text: 'this is a test review',
 *  ratings: [{
 *    id: 'NA==', // base64 encoded id
 *    value_id: 'MjA=' // base64 encoded value_id
 *  }]
 * };
 *
 * const result = await sdk.magento.createProductReview(review);
 *
 * // result will contain the created review and summary data
 * ```
 */
export async function createProductReview<RES extends CreateProductReviewResponse>(params: CreateProductReviewInput, options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'createProductReview',
    [params, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
