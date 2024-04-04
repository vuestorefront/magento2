import { MergeCartsMutationVariables, Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link mergeCarts} method.
 */
export type MergeCartsMutation = { mergeCarts: Mutation['mergeCarts'] };

/**
 * mergeCarts response type
 */
export type MergeCartsResponse<T extends DeepPartial<MergeCartsMutation> = MergeCartsMutation> = ApolloQueryResult<T>;

/**
 * Method to merge carts
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/mergeCarts | mergeCarts } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/mergeCarts | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/MergeCartsResponse | MergeCartsResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const params = {
 *   sourceCartId: 'pCS0ykep1l3wGlPKSyWLJq5fb1DxIQcp',
 *   // this cart needs to have been created by a logged in user
 *   destinationCartId: 'xiYYh2ep0l3xGtPsz2WLJf5f31DxBJx0'
 * }
 *
 * // merge carts and return the result (cart)
 * const mergedCart = await sdk.magento.mergeCarts(params);
 * ```
 *
 * @example
 * Creating a custom GraphQL query for merging carts
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'merge-carts-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation mergeCarts($sourceCartId: String!, $destinationCartId: String!) {
 *                mergeCarts(source_cart_id: $sourceCartId, destination_cart_id: $destinationCartId) {
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
 * Using a custom GraphQL query to merge carts
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   cart: 'merge-carts-custom-query',
 *   metadata: {
 *     fields: 'id items { product { name } }'
 *   }
 * };
 *
 * const params = {
 *   sourceCartId: 'pCS0ykep1l3wGlPKSyWLJq5fb1DxIQcp',
 *   destinationCartId: 'xiYYh2ep0l3xGtPsz2WLJf5f31DxBJx0'
 * }
 * const mergedCart = await sdk.magento.mergeCarts(params, { customQuery });
 *
 * // Merged cart will contain only the fields specified in the custom query.
 * ```
 */
export async function mergeCarts<RES extends MergeCartsResponse>(
  params: MergeCartsMutationVariables,
  options?: MethodOptions<CustomQuery<'mergeCarts'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('mergeCarts')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
