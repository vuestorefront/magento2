import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CartQuery, CartQueryVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import cartTotalQtyQuery from "./cartTotalQty";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Resolve cart total quantity
 * This method is optimized to fetch only total quantity of the cart and not the whole cart object.
 * Do not use `cart` query inf you want to fetch only total quantity of the cart.
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
export async function cartTotalQty(context: Context, cartId: string, customHeaders: CustomHeaders = {}): Promise<ApolloQueryResult<CartQuery>> {
  return context.client.query<CartQuery, CartQueryVariables>({
    query: gql`
      ${cartTotalQtyQuery}
    `,
    variables: { cartId },
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
