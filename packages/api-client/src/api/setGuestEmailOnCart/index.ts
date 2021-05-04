import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  SetGuestEmailOnCartInput, SetGuestEmailOnCartMutation, SetGuestEmailOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async ({ client }: Context, input: SetGuestEmailOnCartInput): Promise<FetchResult<SetGuestEmailOnCartMutation>> => client
  .mutate<SetGuestEmailOnCartMutation, SetGuestEmailOnCartMutationVariables>({
  mutation,
  variables: { input },
});
