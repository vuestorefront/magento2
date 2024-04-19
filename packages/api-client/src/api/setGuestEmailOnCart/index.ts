import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import {
  CustomQuery,
  SetGuestEmailOnCartInput,
  SetGuestEmailOnCartMutation,
  SetGuestEmailOnCartMutationVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import setGuestEmailOnCartMutation from "./setGuestEmailOnCart";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Set the guest user email on the cart
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
export async function setGuestEmailOnCart(
  context: Context,
  input: SetGuestEmailOnCartInput,
  customQuery: CustomQuery = { setGuestEmailOnCart: "setGuestEmailOnCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<SetGuestEmailOnCartMutation>> {
  const { setGuestEmailOnCart: setGuestEmailOnCartGQL } = context.extendQuery(customQuery, {
    setGuestEmailOnCart: {
      query: setGuestEmailOnCartMutation,
      variables: { input },
    },
  });

  return context.client.mutate<SetGuestEmailOnCartMutation, SetGuestEmailOnCartMutationVariables>({
    mutation: gql`
      ${setGuestEmailOnCartGQL.query}
    `,
    variables: setGuestEmailOnCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
