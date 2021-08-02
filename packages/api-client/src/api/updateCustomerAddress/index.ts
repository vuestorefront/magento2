import { FetchResult } from '@apollo/client';
import updateCustomerAddress from './updateCustomerAddress';
import {
  CustomerAddressInput,
  UpdateCustomerAddressMutation,
  UpdateCustomerAddressMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: {
    addressId: number;
    input: CustomerAddressInput;
  },
): Promise<FetchResult<UpdateCustomerAddressMutation>> => client
  .mutate<UpdateCustomerAddressMutation,
UpdateCustomerAddressMutationVariables>({
  mutation: updateCustomerAddress,
  variables: {
    id: params.addressId,
    input: params.input,
  },
});
