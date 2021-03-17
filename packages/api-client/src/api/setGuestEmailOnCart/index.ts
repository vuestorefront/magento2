import SetGuestEmailOnCart from './mutation';
import { ExecutionResult } from 'graphql';
import {
  SetGuestEmailOnCartInput,
  SetGuestEmailOnCartOutput
} from '../../types/GraphQL';

const setGuestEmailOnCart = async ({ client }, input: SetGuestEmailOnCartInput): Promise<ExecutionResult<SetGuestEmailOnCartOutput>> => {
  return await client.mutate({
    mutation: SetGuestEmailOnCart,
    variables: { input }
  });
};

export default setGuestEmailOnCart;
