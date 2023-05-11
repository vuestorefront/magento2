import { MutationResetPasswordArgs, ResetPasswordMutation } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { MethodBaseOptions } from '../../types';

/**
 * resetPassword response type
 */
export type ResetPasswordResponse<T extends DeepPartial<ResetPasswordMutation> = ResetPasswordMutation> = FetchResult<T>

/**
 * Method to reset customer password.
 *
 * @remarks
 * This method communicates with the
 * {@link @vue-storefront/magento-api#ApiMethods.resetPassword | resetPassword } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vue-storefront/magento-api#resetPassword | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#ResetPasswordResponse | ResetPasswordResponse}.
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
 *   resetPasswordToken: 'resetPasswordToken' // token obtained from email {@link @vsf-enterprise/magento-sdk#requestPasswordResetEmail}
 * });
 * ```
 */
export async function resetPassword<RES extends ResetPasswordResponse>(params: MutationResetPasswordArgs, options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'resetPassword',
    [params, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
