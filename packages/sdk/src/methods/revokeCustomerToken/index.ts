import { Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { client } from '../../client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender'
import { MethodBaseOptions } from '../../types';

/**
 * mutation type for the {@link revokeCustomerToken} method.
 */
export type RevokeCustomerTokenMutation = { revokeCustomerToken: Mutation['revokeCustomerToken'] };

/**
 * revokeCustomerToken response type
 */
export type RevokeCustomerTokenResponse<
  T extends DeepPartial<RevokeCustomerTokenMutation> = RevokeCustomerTokenMutation,
> = FetchResult<T>;

/**
 * Method to revoke customer token.
 * It is used to log out the current customer.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.revokeCustomerToken | revokeCustomerToken } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#revokeCustomerToken | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#RevokeCustomerTokenResponse | RevokeCustomerTokenResponse}.
 *
 * @example
 * Simple usage if the customer is logged in and the token is valid:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // token will be invalidated and the customer will be logged out
 * await sdk.magento.revokeCustomerToken();
 * ```
 */
export async function revokeCustomerToken<RES extends RevokeCustomerTokenResponse>(options?: MethodBaseOptions) {
  const { data } = await client.post<RES>('revokeCustomerToken', [options?.customHeaders], options?.clientConfig);

  return data;
}
