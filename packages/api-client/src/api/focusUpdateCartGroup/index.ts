import { FetchResult } from '@apollo/client/core';
import focusUpdateCartGroup from './focusUpdateCartGroup';
import {
  FocusUpdateCartGroupInput,
  FocusUpdateCartGroupMutation,
  FocusUpdateCartGroupMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: FocusUpdateCartGroupInput,
): Promise<FetchResult<FocusUpdateCartGroupMutation>> => client
  .mutate<FocusUpdateCartGroupMutation, FocusUpdateCartGroupMutationVariables>({
  mutation: focusUpdateCartGroup,
  variables: { input },
  errorPolicy: 'all',
});
