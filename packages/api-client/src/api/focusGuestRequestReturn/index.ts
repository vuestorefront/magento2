import { FetchResult } from '@apollo/client/core';
import focusGuestRequestReturn from './focusGuestRequestReturn';
import {
  FocusGuestRequestReturnInput,
  FocusGuestRequestReturnMutation,
  FocusGuestRequestReturnMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: FocusGuestRequestReturnInput,
): Promise<FetchResult<FocusGuestRequestReturnMutation>> => client
  .mutate<FocusGuestRequestReturnMutation, FocusGuestRequestReturnMutationVariables>({
  mutation: focusGuestRequestReturn,
  variables: { input },
});
