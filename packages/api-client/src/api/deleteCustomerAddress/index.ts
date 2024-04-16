import { FetchResult, gql } from "@apollo/client/core";
import { DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import deleteCustomerAddressMutation from "./deleteCustomerAddress";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Delete a customer address.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const addressId = 12;
 * // customer address will be remove for the currently logged in customer
 * const response = await sdk.magento.deleteCustomerAddress({ id: addressId });
 * // response.data?.deleteCustomerAddress - result is stored here, it's boolean
 * ```
 */
export async function deleteCustomerAddress(
  context: Context,
  addressId: number,
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<DeleteCustomerAddressMutation>> {
  return context.client.mutate<DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables>({
    mutation: gql`
      ${deleteCustomerAddressMutation}
    `,
    variables: { id: addressId },
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
