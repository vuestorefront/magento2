import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  CustomerAddressInput,
  UpdateCustomerAddressMutation,
  UpdateCustomerAddressMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  addressId: number,
  input: CustomerAddressInput,
): Promise<FetchResult<UpdateCustomerAddressMutation>> => client
  .mutate<
UpdateCustomerAddressMutation,
UpdateCustomerAddressMutationVariables>({
  mutation,
  variables: {
    id: addressId,
    input,
  },
});
