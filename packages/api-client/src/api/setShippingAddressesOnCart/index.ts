import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import setShippingAddressesOnCart from './setShippingAddressesOnCart';
import {
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutationFocus,
  SetShippingAddressesOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: SetShippingAddressesOnCartInput,
  customQuery: CustomQuery = { setShippingAddressesOnCart: 'setShippingAddressesOnCart' },
): Promise<FetchResult<SetShippingAddressesOnCartMutationFocus>> => {
  const { setShippingAddressesOnCart: setShippingAddressesOnCartGQL } = context.extendQuery(
    customQuery,
    {
      setShippingAddressesOnCart: {
        query: setShippingAddressesOnCart,
        variables: { input },
      },
    },
  );

  return context.client.mutate<SetShippingAddressesOnCartMutationFocus, SetShippingAddressesOnCartMutationVariables>({
    mutation: setShippingAddressesOnCartGQL.query,
    variables: setShippingAddressesOnCartGQL.variables,
  });
};
