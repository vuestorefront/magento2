import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import setShippingAddressesOnCart from './setShippingAddressesOnCart';
import {
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutation,
  SetShippingAddressesOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: SetShippingAddressesOnCartInput,
  customQuery: CustomQuery = { setShippingAddressesOnCart: 'setShippingAddressesOnCart' },
): Promise<FetchResult<SetShippingAddressesOnCartMutation>> => {
  const { setShippingAddressesOnCart: setShippingAddressesOnCartGQL } = context.extendQuery(
    customQuery,
    {
      setShippingAddressesOnCart: {
        query: setShippingAddressesOnCart,
        variables: { input },
      },
    },
  );

  return context.client.mutate<SetShippingAddressesOnCartMutation, SetShippingAddressesOnCartMutationVariables>({
    mutation: setShippingAddressesOnCartGQL.query,
    variables: setShippingAddressesOnCartGQL.variables,
  });
};
