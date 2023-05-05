import { CustomQuery, MethodOptions } from '../../types';
import { RequestPasswordResetEmailMutation } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * Parameter object for the {@link @vsf-enterprise/magento2-sdk#requestPasswordResetEmail | requestPasswordResetEmail } method.
 */
export type RequestPasswordResetEmailInput = {
  email: string;
}

/**
 * requestPasswordResetEmail response type
 */
export type RequestPasswordResetEmailResponse<T extends DeepPartial<RequestPasswordResetEmailMutation> = RequestPasswordResetEmailMutation> = FetchResult<T>

/**
 * Method to request password reset email
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.requestPasswordResetEmail | requestPasswordResetEmail } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#requestPasswordResetEmail | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#RequestPasswordResetEmailResponse | RequestPasswordResetEmailResponse}.
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
export async function requestPasswordResetEmail<RES extends RequestPasswordResetEmailResponse>(params: RequestPasswordResetEmailInput, options?: MethodOptions<CustomQuery<'requestPasswordResetEmail'>>) {
  const { data } = await client.post<RES>(
    'requestPasswordResetEmail',
    [params, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
