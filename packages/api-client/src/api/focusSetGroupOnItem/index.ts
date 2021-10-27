import { FetchResult } from '@apollo/client/core';
import focusSetGroupOnItem from './focusSetGroupOnItem';
import {
  FocusSetGroupOnItemInput,
  FocusSetGroupOnItemMutation,
  FocusSetGroupOnItemMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: FocusSetGroupOnItemInput,
): Promise<FetchResult<FocusSetGroupOnItemMutation>> => client
  .mutate<FocusSetGroupOnItemMutation, FocusSetGroupOnItemMutationVariables>({
  mutation: focusSetGroupOnItem,
  variables: { input },
  errorPolicy: 'all',
});
