import { ExecutionResult } from 'graphql';
import mutation from './mutation.graphql';
import { Context } from '../../types/context';
import { DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables } from '../../types/GraphQL';

export default async (
  { client }: Context,
  addressId: number,
): Promise<ExecutionResult<DeleteCustomerAddressMutation>> => client
  .mutate<DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables>({
  mutation,
  variables: { id: addressId },
});
