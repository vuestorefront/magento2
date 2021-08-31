import { ApolloQueryResult } from '@apollo/client/core';
import { GiftCardAccountInputArgs, GiftCardAccountQuery } from '../../types/GraphQL';
import giftCardAccount from './giftCardAccount';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  code: string,
): Promise<ApolloQueryResult<GiftCardAccountQuery>> => client
  .query<GiftCardAccountQuery, GiftCardAccountInputArgs>({
  query: giftCardAccount,
  fetchPolicy: 'no-cache',
  variables: { input: { gift_card_code: code } },
});
