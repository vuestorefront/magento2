import { FetchResult } from '@apollo/client';
import generateCustomerToken from './generateCustomerToken';
import {
  GenerateCustomerTokenMutation,
  GenerateCustomerTokenMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  email: string,
  password: string,
): Promise<FetchResult<GenerateCustomerTokenMutation>> => {
  try {
    return await client
      .mutate<GenerateCustomerTokenMutation, GenerateCustomerTokenMutationVariables>({
      mutation: generateCustomerToken,
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
