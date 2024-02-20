import { Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link changeCustomerPassword} method.
 */
export type ChangeCustomerPasswordMutation = { changeCustomerPassword: Mutation['changeCustomerPassword'] };

/**
 * Parameters for the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/changeCustomerPassword | changeCustomerPassword } method.
 */
export type ChangeCustomerPasswordInput = { currentPassword: string; newPassword: string };

/**
 * changeCustomerPassword response type
 */
export type ChangeCustomerPasswordResponse<
  T extends DeepPartial<ChangeCustomerPasswordMutation> = ChangeCustomerPasswordMutation,
> = FetchResult<T>;

/**
 * Method to change customer password.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/changeCustomerPassword | changeCustomerPassword } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/changeCustomerPassword | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/ChangeCustomerPasswordResponse | ChangeCustomerPasswordResponse}.
 *
 * @example
 * Simple usage, change customer password:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const result = await sdk.magento.changeCustomerPassword({
 *  currentPassword: 'currentPassword',
 *  newPassword: 'newPassword'
 * });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for changeCustomerPassword:
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'change-customer-password-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
 *               changeCustomerPassword(
 *                 currentPassword: $currentPassword
 *                 newPassword: $newPassword
 *               ) {
 *                 ${metadata.fields}
 *               }
 *             }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to narrow down the response data:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   changeCustomerPassword: 'change-customer-password-custom-query',
 *   metadata: {
 *     fields: 'email'
 *   }
 * };
 *
 * const result = await sdk.magento.changeCustomerPassword({
 *  currentPassword: 'currentPassword',
 *  newPassword: 'newPassword'
 * }, { customQuery });
 * ```
 */
export async function changeCustomerPassword<RES extends ChangeCustomerPasswordResponse>(
  params: ChangeCustomerPasswordInput,
  options?: MethodOptions<CustomQuery<'changeCustomerPassword'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('changeCustomerPassword')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
