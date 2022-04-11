import { ExecutionResult } from 'graphql';
import { CustomQuery } from '@vue-storefront/core';
import deleteCustomerAddressMutation from './deleteCustomerAddress';
import { Context } from '../../types/context';
import { DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables } from '../../types/GraphQL';

/**
 * Deletes a customer address.
 *
 * @param context VSF Context
 * @param addressId ID of the customer address to delete
 * @param customQuery (optional) - custom GraphQL query that extends the default query
 */
export default async function deleteCustomerAddress(
  context: Context,
  addressId: number,
  customQuery: CustomQuery = { deleteCustomerAddress: 'deleteCustomerAddress' },
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
  });
}
