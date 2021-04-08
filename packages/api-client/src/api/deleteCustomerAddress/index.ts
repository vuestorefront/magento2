import { ExecutionResult } from 'graphql';
import DeleteCustomerAddress from './mutation';
import { Context } from '../../types/context';

const deleteCustomerAddress = async ({ client }: Context, input: { id: Number }): Promise<ExecutionResult<Boolean>> => client.mutate({
  mutation: DeleteCustomerAddress,
  variables: { input },
});

export default deleteCustomerAddress;
