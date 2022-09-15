import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import updateCustomerAddressMutation from './updateCustomerAddress';
import {
  CustomerAddressInput,
  UpdateCustomerAddressMutation,
  UpdateCustomerAddressMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Updates a customer address.
 *
 * @param context VSF Context
 * @param params object with address identifier and the updated data
 * @param [customQuery] (optional) custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function updateCustomerAddress(
  context: Context,
  params: {
    addressId: number;
    input: CustomerAddressInput;
  },
  customQuery: CustomQuery = { updateCustomerAddress: 'updateCustomerAddress' },
  customHeaders: Record<string, string> = {},
): Promise<FetchResult<UpdateCustomerAddressMutation>> {
  const { updateCustomerAddress: updateCustomerAddressGQL } = context.extendQuery(customQuery, {
    updateCustomerAddress: {
      query: updateCustomerAddressMutation,
      variables: {
        id: params.addressId,
        input: params.input,
      },
    },
  });

  return context.client.mutate<UpdateCustomerAddressMutation, UpdateCustomerAddressMutationVariables>({
    mutation: updateCustomerAddressGQL.query,
    variables: updateCustomerAddressGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
