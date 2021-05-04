import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutation,
  SetShippingAddressesOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: SetShippingAddressesOnCartInput,
): Promise<FetchResult<SetShippingAddressesOnCartMutation>> => client
  .mutate<
SetShippingAddressesOnCartMutation,
SetShippingAddressesOnCartMutationVariables>({
  mutation,
  variables: { input },
});
