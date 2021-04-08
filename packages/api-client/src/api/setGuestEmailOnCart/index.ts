import { ExecutionResult } from 'graphql';
import SetGuestEmailOnCart from './mutation';
import {
  SetGuestEmailOnCartInput,
  SetGuestEmailOnCartOutput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

const setGuestEmailOnCart = async ({ client }: Context, input: SetGuestEmailOnCartInput):
Promise<ExecutionResult<SetGuestEmailOnCartOutput>> => client.mutate({
  mutation: SetGuestEmailOnCart,
  variables: { input },
});

export default setGuestEmailOnCart;
