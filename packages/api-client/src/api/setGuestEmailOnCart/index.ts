import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import setGuestEmailOnCart from './setGuestEmailOnCart';
import {
  SetGuestEmailOnCartInput, SetGuestEmailOnCartMutation, SetGuestEmailOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: SetGuestEmailOnCartInput,
  customQuery: CustomQuery = { setGuestEmailOnCart: 'setGuestEmailOnCart' },
): Promise<FetchResult<SetGuestEmailOnCartMutation>> => {
  const { setGuestEmailOnCart: setGuestEmailOnCartGQL } = context.extendQuery(
    customQuery,
    {
      setGuestEmailOnCart: {
        query: setGuestEmailOnCart,
        variables: { input },
      },
    },
  );

  return context.client.mutate<SetGuestEmailOnCartMutation, SetGuestEmailOnCartMutationVariables>({
    mutation: setGuestEmailOnCartGQL.query,
    variables: setGuestEmailOnCartGQL.variables,
  });
};
