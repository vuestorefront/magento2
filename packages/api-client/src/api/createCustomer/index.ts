import { FetchResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/core';
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
  customQuery: CustomQuery = { createCustomer: 'createCustomer' },
): Promise<FetchResult<CreateCustomerMutation>> => {
  try {
    const { createCustomer: createCustomerGQL } = context.extendQuery(
      customQuery,
      {
        createCustomer: {
          query: createCustomer,
          variables: { input },
        },
      },
    );

    return await context
      .client
      .mutate<CreateCustomerMutation, CreateCustomerMutationVariables>({
      mutation: createCustomerGQL.query,
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
