import { FetchResult } from '@apollo/client';
import { CustomQuery, Logger } from '@vue-storefront/core';
import gql from 'graphql-tag';
import resetPasswordMutation from './resetPassword';
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: ResetPasswordMutationVariables,
  customQuery?: CustomQuery,
): Promise<FetchResult<ResetPasswordMutation>> => {
  const { resetPassword } = context.extendQuery(
    customQuery, {
      resetPassword: {
        query: resetPasswordMutation,
        variables: input,
      },
    },
  );

  try {
    Logger.debug('[VSF: Magento] requestPasswordResetEmail', JSON.stringify(input, null, 2));
    const result = await context.client
      .mutate<ResetPasswordMutation, ResetPasswordMutationVariables>({
      mutation: gql`${resetPassword.query}`,
      variables: resetPassword.variables,
    });

    if (!result.data.resetPassword) throw new Error('It was not possible to change the user password.');

    return result;
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      Logger.debug(error);

      return {
        errors: error.graphQLErrors,
        data: null,
      };
    }
    Logger.error(error);
    throw error.networkError?.result || error;
  }
};
