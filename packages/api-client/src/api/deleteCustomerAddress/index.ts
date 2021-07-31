import { ExecutionResult } from 'graphql';
import deleteCustomerAddress from './deleteCustomerAddress';
import { Context } from '../../types/context';
import { DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables } from '../../types/GraphQL';

export default async (
  { client }: Context,
  addressId: number,
): Promise<ExecutionResult<DeleteCustomerAddressMutation>> => client
  .mutate<DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables>({
  mutation: deleteCustomerAddress,
  variables: { id: addressId },
});
