import { FetchResult } from '@apollo/client/core';
import {
  CustomQuery,
  CreateCustomerAddressMutation,
  CreateCustomerAddressMutationVariables,
  CustomerAddressInput,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import createCustomerAddressMutation from './createCustomerAddress';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Creates a customer address.
 *
 * @param context VSF Context
 * @param input new customer address data
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function createCustomerAddress(
  context: Context,
  input: CustomerAddressInput,
  customQuery: CustomQuery = { createCustomerAddress: 'createCustomerAddress' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<CreateCustomerAddressMutation>> {
  const { createCustomerAddress: createCustomerAddressGQL } = context.extendQuery(
    customQuery,
    {
      createCustomerAddress: {
        query: createCustomerAddressMutation,
        variables: { input },
      },
    },
  );

  return context.client.mutate<CreateCustomerAddressMutation, CreateCustomerAddressMutationVariables>({
    mutation: createCustomerAddressGQL.query,
    variables: createCustomerAddressGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
