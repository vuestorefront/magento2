import { ApolloQueryResult } from '@apollo/client/core';
import { FocusGuestRmaQuery, FocusGuestRmaInput, FocusGuestRmaArgs } from '../../types/GraphQL';
import focusGuestRma from './focusGuestRma';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: FocusGuestRmaInput,
): Promise<ApolloQueryResult<FocusGuestRmaQuery>> => client
  .query<FocusGuestRmaQuery, FocusGuestRmaArgs>({
  query: focusGuestRma,
  variables: { input },
  fetchPolicy: 'no-cache',
});
