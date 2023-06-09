import { FetchResult, gql } from '@apollo/client/core';
import { DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables } from '@vue-storefront/magento-types';
import type { CustomHeaders } from '@vue-storefront/magento-types';
import deleteCustomerAddressMutation from './deleteCustomerAddress';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Deletes a customer address.
 *
 * @param context VSF Context
 * @param addressId ID of the customer address to delete
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function deleteCustomerAddress(
  context: Context,
  addressId: number,
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<DeleteCustomerAddressMutation>> {
  return context.client.mutate<DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables>({
    mutation: gql`${deleteCustomerAddressMutation}`,
    variables: { id: addressId },
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
