import { Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import type { CustomQuery, MethodOptions } from '../../types';
/**
 * mutation type for the {@link generateCustomerToken} method.
 */
export type GenerateCustomerTokenMutation = { generateCustomerToken: Mutation['generateCustomerToken'] };

/**
 * Parameters used in the {@link generateCustomerToken} method.
 */
export type GenerateCustomerTokenInput = {
  email: string;
  password: string;
};

/**
 * generateCustomerToken response type
 */
export type GenerateCustomerTokenResponse<
  T extends DeepPartial<GenerateCustomerTokenMutation> = GenerateCustomerTokenMutation,
> = FetchResult<T>;

/**
 * Method to generate customer token
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/generateCustomerToken | generateCustomerToken } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/generateCustomerToken | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/GenerateCustomerTokenResponse | GenerateCustomerTokenResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch token
 * const result = await sdk.magento.generateCustomerToken({
 *   email: 'some-email',
 *   password: 'some-password'
 * });
 *
 * // Token is now available in result.data.generateCustomerToken.token
 * ```
 *
 *  * @example
 * Creating a custom GraphQL query to fetch additional data:
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'generate-customer-token-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation generateCustomerToken($email: String!, $password: String!) {
 *                generateCustomerToken(email: $email, password: $password) {
 *                  ${metadata.fields}
 *                }
 *              }
 *            }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   route: 'generate-customer-token-custom-query',
 *   metadata: {
 *     fields: 'token additional_field'
 *   }
 * };
 *
 * // data will contain only the fields specified in the custom query.
 * const result = await sdk.magento.generateCustomerToken({
 *   email: 'some-email',
 *   password: 'some-password'
 * }, { customQuery });
 * ```
 */
export async function generateCustomerToken<RES extends GenerateCustomerTokenResponse>(
  params: GenerateCustomerTokenInput,
  options?: MethodOptions<CustomQuery<'generateCustomerToken'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('generateCustomerToken')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
