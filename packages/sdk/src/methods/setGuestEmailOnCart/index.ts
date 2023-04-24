import { MethodBaseOptions } from '../../types';
import { SetGuestEmailOnCartInput, SetGuestEmailOnCartMutation } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * setGuestEmailOnCart response type
 */
export type SetGuestEmailOnCartResponse<T extends DeepPartial<SetGuestEmailOnCartMutation> = SetGuestEmailOnCartMutation> = FetchResult<T>

/**
 * Method to set the guest user email on the cart
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.setGuestEmailOnCart | setGuestEmailOnCart } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#setGuestEmailOnCart | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#SetGuestEmailOnCartResponse | SetGuestEmailOnCartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // set an email on the cart
 * const result = await sdk.magento.setGuestEmailOnCart({ cart_id: 'some-cart-id', email: 'some-email' });
 *
 * // new email will be set on the cart
 * // data.setGuestEmailOnCart.cart.email will contain the email address
 * ```
 */
export async function setGuestEmailOnCart<RES extends SetGuestEmailOnCartResponse>(params: SetGuestEmailOnCartInput, options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'setGuestEmailOnCart',
    [params, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
