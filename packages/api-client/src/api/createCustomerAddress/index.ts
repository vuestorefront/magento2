import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import createCustomerAddressMutation from './createCustomerAddress';
import type {
  CreateCustomerAddressMutation,
  CreateCustomerAddressMutationVariables,
  CustomerAddressInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

/**
 * Creates a customer address.
 *
 * @param context VSF Context
 * @param input new customer address data
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 */
export default async function createCustomerAddress(
  context: Context,
  input: CustomerAddressInput,
  customQuery: CustomQuery = { createCustomerAddress: 'createCustomerAddress' },
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
  });
}
