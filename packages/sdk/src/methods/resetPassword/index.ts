import { Mutation, MutationResetPasswordArgs } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { client } from '../../client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender'
import { MethodBaseOptions } from '../../types';

/**
 * mutation type for the {@link resetPassword} method.
 */
export type ResetPasswordMutation = { resetPassword: Mutation['resetPassword'] };

/**
 * resetPassword response type
 */
export type ResetPasswordResponse<T extends DeepPartial<ResetPasswordMutation> = ResetPasswordMutation> =
  FetchResult<T>;

/**
 * Method to reset customer password.
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.resetPassword | resetPassword } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#resetPassword | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ResetPasswordResponse | ResetPasswordResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch resetPassword
 * const await sdk.magento.resetPassword({
 *   email: 'customer.email@gmail.com'
 *   newPassword: 'newPassword',
 *   resetPasswordToken: 'resetPasswordToken' // token obtained from email {@link @vue-storefront/magento-sdk#requestPasswordResetEmail}
 * });
 * ```
 */
export async function resetPassword<RES extends ResetPasswordResponse>(
  params: MutationResetPasswordArgs,
  options?: MethodBaseOptions,
) {
  const { data } = await client.post<RES>('resetPassword', [params, options?.customHeaders], options?.clientConfig);

  return data;
}
