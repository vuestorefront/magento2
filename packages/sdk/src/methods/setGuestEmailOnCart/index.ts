import { Mutation, SetGuestEmailOnCartInput } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { client } from '../../client';
import { MethodBaseOptions } from '../../types';

/**
 * mutation type for the {@link setGuestEmailOnCart} method.
 */
export type SetGuestEmailOnCartMutation = { setGuestEmailOnCart: Mutation['setGuestEmailOnCart'] };

/**
 * setGuestEmailOnCart response type
 */
export type SetGuestEmailOnCartResponse<
  T extends DeepPartial<SetGuestEmailOnCartMutation> = SetGuestEmailOnCartMutation,
> = FetchResult<T>;

/**
 * Method to set the guest user email on the cart
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.setGuestEmailOnCart | setGuestEmailOnCart } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#setGuestEmailOnCart | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#SetGuestEmailOnCartResponse | SetGuestEmailOnCartResponse}.
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
export async function setGuestEmailOnCart<RES extends SetGuestEmailOnCartResponse>(
  params: SetGuestEmailOnCartInput,
  options?: MethodBaseOptions,
) {
  const { data } = await client.post<RES>(
    'setGuestEmailOnCart',
    [params, options?.customHeaders],
    options?.clientConfig,
  );

  return data;
}
