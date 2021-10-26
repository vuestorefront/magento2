import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import setShippingMethodsOnCart from './setShippingMethodsOnCart';
import {
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartMutation,
  SetShippingMethodsOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: SetShippingMethodsOnCartInput,
  customQuery: CustomQuery = { setShippingMethodsOnCart: 'setShippingMethodsOnCart' },
): Promise<FetchResult<SetShippingMethodsOnCartMutation>> => {
  const { setShippingMethodsOnCart: setShippingMethodsOnCartGQL } = context.extendQuery(
    customQuery,
    {
      setShippingMethodsOnCart: {
        query: setShippingMethodsOnCart,
        variables: { input },
      },
    },
  );

  return context.client.mutate<SetShippingMethodsOnCartMutation, SetShippingMethodsOnCartMutationVariables>({
    mutation: setShippingMethodsOnCartGQL.query,
    variables: setShippingMethodsOnCartGQL.variables,
  });
};
