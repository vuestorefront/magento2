import { FetchResult } from '@apollo/client';
import changeCustomerPassword from './changeCustomerPassword';
import {
  ChangeCustomerPasswordMutation,
  ChangeCustomerPasswordMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  currentPassword: string,
  newPassword: string,
): Promise<FetchResult<ChangeCustomerPasswordMutation>> => {
  try {
    return await client
      .mutate<ChangeCustomerPasswordMutation, ChangeCustomerPasswordMutationVariables>({
      mutation: changeCustomerPassword,
      variables: {
        currentPassword,
        newPassword,
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
