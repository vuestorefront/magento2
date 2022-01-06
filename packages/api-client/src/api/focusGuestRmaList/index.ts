import { ApolloQueryResult } from '@apollo/client/core';
import { FocusGuestRmaListQuery, FocusGuestRmaListArgs, FocusGuestRmaListInput } from '../../types/GraphQL';
import focusGuestRmaList from './focusGuestRmaList';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: FocusGuestRmaListInput,
): Promise<ApolloQueryResult<FocusGuestRmaListQuery>> => client
  .query<FocusGuestRmaListQuery, FocusGuestRmaListArgs>({
  query: focusGuestRmaList,
  variables: { input },
  fetchPolicy: 'no-cache',
});
