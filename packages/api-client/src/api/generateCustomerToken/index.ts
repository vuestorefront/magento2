import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import generateCustomerToken from './generateCustomerToken';
import {
  GenerateCustomerTokenMutation,
  GenerateCustomerTokenMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  email: string,
  password: string,
  customQuery: CustomQuery = { generateCustomerToken: 'generateCustomerToken' },
): Promise<FetchResult<GenerateCustomerTokenMutation>> => {
  try {
    const { generateCustomerToken: generateCustomerTokenGQL } = context.extendQuery(
      customQuery,
      {
        generateCustomerToken: {
          query: generateCustomerToken,
          variables: {
            email,
            password,
          },
        },
      },
    );

    return await context.client
      .mutate<GenerateCustomerTokenMutation, GenerateCustomerTokenMutationVariables>({
      mutation: generateCustomerTokenGQL.query,
      variables: {
        email,
        password,
      },
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
