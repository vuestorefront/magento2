import { Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link requestPasswordResetEmail} method.
 */
export type RequestPasswordResetEmailMutation = { requestPasswordResetEmail: Mutation['requestPasswordResetEmail'] };

/**
 * Parameter object for the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/requestPasswordResetEmail | requestPasswordResetEmail } method.
 */
export type RequestPasswordResetEmailInput = {
  email: string;
};

/**
 * requestPasswordResetEmail response type
 */
export type RequestPasswordResetEmailResponse<
  T extends DeepPartial<RequestPasswordResetEmailMutation> = RequestPasswordResetEmailMutation,
> = FetchResult<T>;

/**
 * Method to request password reset email
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/requestPasswordResetEmail | requestPasswordResetEmail } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/requestPasswordResetEmail | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/RequestPasswordResetEmailResponse | RequestPasswordResetEmailResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // trigger sending of password reset email
 * const result = await sdk.magento.requestPasswordResetEmail({ email: 'john.doe@gmail.com'});
 *
 * // result.data.requestPasswordResetEmail contains the boolean response from the API
 * ```
 */
export async function requestPasswordResetEmail<RES extends RequestPasswordResetEmailResponse>(
  params: RequestPasswordResetEmailInput,
  options?: MethodOptions<CustomQuery<'requestPasswordResetEmail'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('requestPasswordResetEmail')
    .setMethod('POST')
    .setProps([params, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
