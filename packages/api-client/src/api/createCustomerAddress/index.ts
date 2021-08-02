import { FetchResult } from '@apollo/client';
import createCustomerAddress from './createCustomerAddress';
import {
  CreateCustomerAddressMutation,
  CreateCustomerAddressMutationVariables,
  CustomerAddressInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: CustomerAddressInput,
): Promise<FetchResult<CreateCustomerAddressMutation>> => client
  .mutate<CreateCustomerAddressMutation, CreateCustomerAddressMutationVariables>({
  mutation: createCustomerAddress,
  variables: { input },
});
