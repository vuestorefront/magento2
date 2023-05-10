import { MethodBaseOptions } from '../../types';
import { GenerateCustomerTokenMutation } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * Parameters used in the {@link generateCustomerToken} method.
 */
export type GenerateCustomerTokenInput = {
  email: string;
  password: string;
}

/**
 * generateCustomerToken response type
 */
export type GenerateCustomerTokenResponse<T extends DeepPartial<GenerateCustomerTokenMutation> = GenerateCustomerTokenMutation> = FetchResult<T>

/**
 * Method to generate customer token
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-storefront/magento-api#ApiMethods.generateCustomerToken | generateCustomerToken } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#generateCustomerToken | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#GenerateCustomerTokenResponse | GenerateCustomerTokenResponse}.
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
 */
export async function generateCustomerToken<RES extends GenerateCustomerTokenResponse>(params: GenerateCustomerTokenInput, options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'generateCustomerToken',
    [params, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
