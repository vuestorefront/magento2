import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
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
  mutation,
  variables: { input },
});
