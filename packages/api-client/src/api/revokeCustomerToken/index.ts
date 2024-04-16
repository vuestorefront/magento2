import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { RevokeCustomerTokenMutation } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import revokeCustomerTokenMutation from "./revokeCustomerToken";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Revoke customer token.
 * It is used to log out the current customer.
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
export async function revokeCustomerToken(context: Context, customHeaders: CustomHeaders = {}): Promise<FetchResult<RevokeCustomerTokenMutation>> {
  return context.client.mutate<RevokeCustomerTokenMutation>({
    mutation: gql`
      ${revokeCustomerTokenMutation}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
