import { ApolloQueryResult } from '@apollo/client';
import { CartQueryVariables } from '@vue-storefront/magento-types';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { MethodBaseOptions } from '../../types';
import { client } from '../../client';

/**
 * Cart total query type
 */
export type CartTotalQtyQuery = {
  cart: {
    total_quantity: number;
  };
};

/**
 * Cart total quantity response type
 */
export type CartTotalQtyResponse<T extends CartTotalQtyQuery = CartTotalQtyQuery> = ApolloQueryResult<T>;

/**
 * Method to resolve cart total quantity
 * This method is optimized to fetch only total quantity of the cart and not the whole cart object.
 * Do not use `cart` query inf you want to fetch only total quantity of the cart.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/cartTotalQty | cartTotalQty } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/cartTotalQty | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CartTotalQtyResponse | CartTotalQtyResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch total quantity of the cart
 * const { data } await sdk.magento.cartTotalQty({cartId: 'some_cart_id' });
 *
 * // total quantity of the cart available in data.cart.total_quantity
 * ```
 */
export async function cartTotalQty<RES extends CartTotalQtyResponse>(
  params: CartQueryVariables,
  options?: MethodBaseOptions,
) {
  return new AxiosRequestSender(client)
    .setUrl('cartTotalQty')
    .setMethod('POST')
    .setProps([params.cartId, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
