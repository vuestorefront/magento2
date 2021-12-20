import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import createCustomerAddress from './createCustomerAddress';
import {
  CreateCustomerAddressMutation,
  CreateCustomerAddressMutationVariables,
  CustomerAddressInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CustomerAddressInput,
  customQuery: CustomQuery = { createCustomerAddress: 'createCustomerAddress' },
): Promise<FetchResult<CreateCustomerAddressMutation>> => {
  const { createCustomerAddress: createCustomerAddressGQL } = context.extendQuery(
    customQuery,
    {
      createCustomerAddress: {
        query: createCustomerAddress,
        variables: input,
      },
    },
  );

  return context.client.mutate<CreateCustomerAddressMutation, CreateCustomerAddressMutationVariables>({
    mutation: createCustomerAddressGQL.query,
    variables: createCustomerAddressGQL.variables,
  });
};
