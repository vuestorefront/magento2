import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import setBillingAddressOnCart from './setBillingAddressOnCart';
import {
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartMutation,
  SetBillingAddressOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: SetBillingAddressOnCartInput,
  customQuery: CustomQuery = { setBillingAddressOnCart: 'setBillingAddressOnCart' },
): Promise<FetchResult<SetBillingAddressOnCartMutation>> => {
  const { setBillingAddressOnCart: setBillingAddressOnCartGQL } = context.extendQuery(
    customQuery,
    {
      setBillingAddressOnCart: {
        query: setBillingAddressOnCart,
        variables: input,
      },
    },
  );

  return context.client.mutate<SetBillingAddressOnCartMutation, SetBillingAddressOnCartMutationVariables>({
    mutation: setBillingAddressOnCartGQL.query,
    variables: setBillingAddressOnCartGQL.variables,
  });
};
