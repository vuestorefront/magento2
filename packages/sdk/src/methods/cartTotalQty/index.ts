import { MethodBaseOptions } from '../../types';
import { client } from '../../client';
import { ApolloQueryResult } from '@apollo/client';
import { CartQueryVariables } from '@vue-storefront/magento-types';

/**
 * Cart total query type
 */
export type CartTotalQtyQuery = {
  cart: {
    total_quantity: number;
  }
}

/**
 * Cart total quantity response type
 */
export type CartTotalQtyResponse<T extends CartTotalQtyQuery = CartTotalQtyQuery> = ApolloQueryResult<T>

/**
 * Method to resolve cart total quantity
 * This method is optimized to fetch only total quantity of the cart and not the whole cart object.
 * Do not use `cart` query inf you want to fetch only total quantity of the cart.
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.cartTotalQty | cartTotalQty } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#cartTotalQty | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#CartTotalQtyResponse | CartTotalQtyResponse}.
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
export async function cartTotalQty<RES extends CartTotalQtyResponse>(params: CartQueryVariables, options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'cartTotalQty',
    [params.cartId, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
