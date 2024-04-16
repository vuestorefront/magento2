import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CreateEmptyCartMutation } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import createEmptyCartQuery from "./createEmptyCart";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Create an empty cart.
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
export async function createEmptyCart(context: Context, customHeaders: CustomHeaders = {}): Promise<FetchResult<CreateEmptyCartMutation>> {
  return context.client.mutate<CreateEmptyCartMutation>({
    mutation: gql`
      ${createEmptyCartQuery}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
