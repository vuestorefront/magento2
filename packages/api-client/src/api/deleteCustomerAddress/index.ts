import { ExecutionResult } from 'graphql';
import { CustomQuery } from '@vue-storefront/middleware';
import deleteCustomerAddressMutation from './deleteCustomerAddress';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import { DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables } from '../../types/GraphQL';
import getHeaders from '../getHeaders';

/**
 * Deletes a customer address.
 *
 * @param context VSF Context
 * @param addressId ID of the customer address to delete
 * @param customQuery (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function deleteCustomerAddress(
  context: Context,
  addressId: number,
  customQuery: CustomQuery = { deleteCustomerAddress: 'deleteCustomerAddress' },
  customHeaders: CustomHeaders = {},
): Promise<ExecutionResult<DeleteCustomerAddressMutation>> {
  const { deleteCustomerAddress: deleteCustomerAddressGQL } = context.extendQuery(
    customQuery,
    {
      deleteCustomerAddress: {
        query: deleteCustomerAddressMutation,
        variables: { id: addressId },
      },
    },
  );

  return context.client.mutate<DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables>({
    mutation: deleteCustomerAddressGQL.query,
    variables: deleteCustomerAddressGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
