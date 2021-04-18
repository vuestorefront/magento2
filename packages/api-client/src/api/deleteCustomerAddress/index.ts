import DeleteCustomerAddress from './mutation';
import { ExecutionResult } from 'graphql';

const deleteCustomerAddress = async ({ client }, input: {id: number}): Promise<ExecutionResult<boolean>> => {
  return await client.mutate({
    mutation: DeleteCustomerAddress,
    variables: { input }
  });
};

export default deleteCustomerAddress;
