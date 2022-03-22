import { ApolloQueryResult } from '@apollo/client/core';
import { FocusDeliveryTimeQuery, FocusDeliveryTimeForAddressInput, FocusDeliveryTimeForAddressArgs } from '../../types/GraphQL';
import focusDeliveryTimeForAddress from './focusDeliveryTimeForAddress';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: FocusDeliveryTimeForAddressInput,
): Promise<ApolloQueryResult<FocusDeliveryTimeQuery>> => client
  .query<FocusDeliveryTimeQuery, FocusDeliveryTimeForAddressArgs>({
  query: focusDeliveryTimeForAddress,
  variables: { input },
});
