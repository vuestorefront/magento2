import { FetchResult } from '@apollo/client/core';
import {
  CustomQuery,
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartMutation,
  SetBillingAddressOnCartMutationVariables,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import setBillingAddressOnCart from './setBillingAddressOnCart';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  input: SetBillingAddressOnCartInput,
  customQuery: CustomQuery = { setBillingAddressOnCart: 'setBillingAddressOnCart' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<SetBillingAddressOnCartMutation>> => {
  const { setBillingAddressOnCart: setBillingAddressOnCartGQL } = context.extendQuery(
    customQuery,
    {
      setBillingAddressOnCart: {
        query: setBillingAddressOnCart,
        variables: { input },
      },
    },
  );

  return context.client.mutate<SetBillingAddressOnCartMutation, SetBillingAddressOnCartMutationVariables>({
    mutation: setBillingAddressOnCartGQL.query,
    variables: setBillingAddressOnCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
