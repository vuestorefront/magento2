import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import setGuestEmailOnCartMutation from './setGuestEmailOnCart';
import {
  SetGuestEmailOnCartInput, SetGuestEmailOnCartMutation, SetGuestEmailOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Set the guest user email on the cart
 * @param context VSF Context
 * @param input Variables to set guest email
 * @param [customQuery] (optional) - Custom query that will extend default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function setGuestEmailOnCart(
  context: Context,
  input: SetGuestEmailOnCartInput,
  customQuery: CustomQuery = { setGuestEmailOnCart: 'setGuestEmailOnCart' },
  customHeaders: Record<string, string> = {},
): Promise<FetchResult<SetGuestEmailOnCartMutation>> {
  const { setGuestEmailOnCart: setGuestEmailOnCartGQL } = context.extendQuery(
    customQuery,
    {
      setGuestEmailOnCart: {
        query: setGuestEmailOnCartMutation,
        variables: { input },
      },
    },
  );

  return context.client.mutate<SetGuestEmailOnCartMutation, SetGuestEmailOnCartMutationVariables>({
    mutation: setGuestEmailOnCartGQL.query,
    variables: setGuestEmailOnCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
