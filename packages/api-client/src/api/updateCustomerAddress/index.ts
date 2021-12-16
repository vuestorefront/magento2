import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import updateCustomerAddress from './updateCustomerAddress';
import {
  CustomerAddressInput,
  UpdateCustomerAddressMutation,
  UpdateCustomerAddressMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  params: {
    addressId: number;
    input: CustomerAddressInput;
  },
  customQuery: CustomQuery = { updateCustomerAddress: 'updateCustomerAddress' },
): Promise<FetchResult<UpdateCustomerAddressMutation>> => {
  const { updateCustomerAddress: updateCustomerAddressGQL } = context.extendQuery(
    customQuery,
    {
      updateCustomerAddress: {
        query: updateCustomerAddress,
        variables: {
          id: params.addressId,
          input: params.input,
        },
      },
    },
  );

  return context.client.mutate<UpdateCustomerAddressMutation, UpdateCustomerAddressMutationVariables>({
    mutation: updateCustomerAddressGQL.query,
    variables: {
      id: params.addressId,
      input: params.input,
    },
  });
};
