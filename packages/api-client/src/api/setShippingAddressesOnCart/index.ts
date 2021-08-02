import { FetchResult } from '@apollo/client';
import setShippingAddressesOnCart from './setShippingAddressesOnCart';
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
  mutation: setShippingAddressesOnCart,
  variables: { input },
});
