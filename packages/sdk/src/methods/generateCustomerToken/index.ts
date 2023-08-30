import { Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { MethodBaseOptions } from '../../types';

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
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.generateCustomerToken | generateCustomerToken } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#generateCustomerToken | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#GenerateCustomerTokenResponse | GenerateCustomerTokenResponse}.
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
export async function generateCustomerToken<RES extends GenerateCustomerTokenResponse>(
  params: GenerateCustomerTokenInput,
  options?: MethodBaseOptions,
) {
  const { data } = await client.post<RES>(
    'generateCustomerToken',
    [params, options?.customHeaders],
    options?.clientConfig,
  );

  return data;
}
