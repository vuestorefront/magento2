import { FetchResult } from '@apollo/client';
import generateCustomerToken from './generateCustomerToken';
import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  GenerateCustomerTokenMutation,
  GenerateCustomerTokenMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import createCustomer from '../createCustomer/createCustomer';

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
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
