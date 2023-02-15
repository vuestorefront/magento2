import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/middleware';
import updateCustomer from './updateCustomer';
import {
  CustomerUpdateInput,
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

/**
 * Updates the data of the current customer. To override the default query, use the `updateCustomer` query key.
 */
export default async (
  context: Context,
  input: CustomerUpdateInput,
  customQuery: CustomQuery = { updateCustomer: 'updateCustomer' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<UpdateCustomerMutation>> => {
  const { updateCustomer: updateCustomerGQL } = context.extendQuery(
    customQuery,
    {
      updateCustomer: {
        query: updateCustomer,
        variables: { input },
      },
    },
  );

  return context.client.mutate<UpdateCustomerMutation, UpdateCustomerMutationVariables>({
    mutation: updateCustomerGQL.query,
    variables: updateCustomerGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
