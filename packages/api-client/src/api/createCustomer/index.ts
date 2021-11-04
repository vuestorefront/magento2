import { FetchResult } from '@apollo/client';
import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  CustomerCreateInput,
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
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      return {
        errors: error.graphQLErrors,
        data: null,
      };
    }
    throw error.networkError?.result || error;
  }
};
