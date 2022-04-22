import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import changeCustomerPassword from './changeCustomerPassword';
import {
  ChangeCustomerPasswordMutation,
  ChangeCustomerPasswordMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

/**
 * Changes password of the current customer. To override the default query, use the `changeCustomerPassword` query key.
 */
export default async (
  context: Context,
  params: { currentPassword: string; newPassword: string; },
  customQuery: CustomQuery = { changeCustomerPassword: 'changeCustomerPassword' },
): Promise<FetchResult<ChangeCustomerPasswordMutation>> => {
  try {
    const { changeCustomerPassword: changeCustomerPasswordGQL } = context.extendQuery(
      customQuery,
      {
        changeCustomerPassword: {
          query: changeCustomerPassword,
          variables: { ...params },
        },
      },
    );
    return await context.client
      .mutate<ChangeCustomerPasswordMutation, ChangeCustomerPasswordMutationVariables>({
      mutation: changeCustomerPasswordGQL.query,
      variables: changeCustomerPasswordGQL.variables,
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
