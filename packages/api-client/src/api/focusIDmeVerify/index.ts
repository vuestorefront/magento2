import { FetchResult } from '@apollo/client/core';
import focusIDmeVerify from './focusIDmeVerify';
import {
  FocusIDmeVerifyInput,
  FocusIDmeVerifyMutation,
  FocusIDmeVerifyMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: FocusIDmeVerifyInput,
): Promise<FetchResult<FocusIDmeVerifyMutation>> => client
  .mutate<FocusIDmeVerifyMutation, FocusIDmeVerifyMutationVariables>({
  mutation: focusIDmeVerify,
  variables: { input },
});
