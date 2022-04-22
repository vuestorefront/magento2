import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import setShippingAddressesOnCart from './setShippingAddressesOnCart';
import {
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutation,
  SetShippingAddressesOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

/**
 * Sets a shipping address on received cart.
 *
 * @param context VSF context
 * @param input params with cart ID and shipping address.
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 */
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
