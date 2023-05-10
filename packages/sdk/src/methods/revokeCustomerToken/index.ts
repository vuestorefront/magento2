import { MethodBaseOptions } from '../../types';
import { RevokeCustomerTokenMutation } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * revokeCustomerToken response type
 */
export type RevokeCustomerTokenResponse<T extends DeepPartial<RevokeCustomerTokenMutation> = RevokeCustomerTokenMutation> = FetchResult<T>

/**
 * Method to revoke customer token.
 * It is used to log out the current customer.
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-storefront/magento-api#ApiMethods.revokeCustomerToken | revokeCustomerToken } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#revokeCustomerToken | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#RevokeCustomerTokenResponse | RevokeCustomerTokenResponse}.
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
  const { data } = await client.post<RES>(
    'revokeCustomerToken',
    [options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
