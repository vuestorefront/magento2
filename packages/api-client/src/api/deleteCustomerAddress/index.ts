import { ExecutionResult } from 'graphql';
import { CustomQuery } from '@vue-storefront/core';
import deleteCustomerAddress from './deleteCustomerAddress';
import { Context } from '../../types/context';
import { DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables } from '../../types/GraphQL';

export default async (
  context: Context,
  addressId: number,
  customQuery: CustomQuery = { deleteCustomerAddress: 'deleteCustomerAddress' },
): Promise<ExecutionResult<DeleteCustomerAddressMutation>> => {
  const { deleteCustomerAddress: deleteCustomerAddressGQL } = context.extendQuery(
    customQuery,
    {
      deleteCustomerAddress: {
        query: deleteCustomerAddress,
        variables: { id: addressId },
      },
    },
  );
  return context.client.mutate<DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables>({
    mutation: deleteCustomerAddressGQL.query,
    variables: deleteCustomerAddressGQL.variables,
  });
};
