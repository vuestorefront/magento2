import { FetchResult } from '@apollo/client';
import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  CustomerCreateInput, ProductDetailsQuery, ProductDetailsQueryVariables,
} from '../../types/GraphQL';
import createCustomer from './createCustomer';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CustomerCreateInput,
): Promise<FetchResult<CreateCustomerMutation>> => {
  try {
    return await context
      .client
      .mutate<CreateCustomerMutation, CreateCustomerMutationVariables>({
      mutation: createCustomer,
      variables: { input },
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
