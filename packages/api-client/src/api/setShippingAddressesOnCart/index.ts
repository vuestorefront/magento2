import type { FetchResult } from '@apollo/client/core';
import type { CustomQuery } from '@vue-storefront/core';
import setShippingAddressesOnCartQuery from './setShippingAddressesOnCart';
import type {
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutation,
  SetShippingAddressesOnCartMutationVariables,
} from '../../types/GraphQL';
import type { Context } from '../../types/context';

/**
 * Sets a shipping address on received cart.
 *
 * @param context VSF context
 * @param input params with cart ID and shipping address.
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 */
export default async function setShippingAddressesOnCart(
  context: Context,
  input: SetShippingAddressesOnCartInput,
  customQuery: CustomQuery = { setShippingAddressesOnCart: 'setShippingAddressesOnCart' },
): Promise<FetchResult<SetShippingAddressesOnCartMutation>> {
  const { setShippingAddressesOnCart: setShippingAddressesOnCartGQL } = context.extendQuery(customQuery, {
    setShippingAddressesOnCart: {
      query: setShippingAddressesOnCartQuery,
      variables: { input },
    },
  });

  return context.client.mutate<SetShippingAddressesOnCartMutation, SetShippingAddressesOnCartMutationVariables>({
    mutation: setShippingAddressesOnCartGQL.query,
    variables: setShippingAddressesOnCartGQL.variables,
  });
}
