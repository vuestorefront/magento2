import { MethodBaseOptions } from '../../types';
import { CreateEmptyCartMutation } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * createEmptyCart response type
 */
export type CreateEmptyCartResponse<T extends DeepPartial<CreateEmptyCartMutation> = CreateEmptyCartMutation> = FetchResult<T>

/**
 * Method to create an empty cart.
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.createEmptyCart | createEmptyCart } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#createEmptyCart | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#CreateEmptyCartResponse | CreateEmptyCartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // create an empty cart
 * const cart = await sdk.magento.createEmptyCart();
 *
 * // cart id can be accessed from the response
 * const cartId = cart.data.createEmptyCart;
 * ```
 */
export async function createEmptyCart<RES extends CreateEmptyCartResponse>(options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'createEmptyCart',
    [options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
