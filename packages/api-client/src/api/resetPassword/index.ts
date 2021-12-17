import { FetchResult } from '@apollo/client/core';
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
  customQuery: CustomQuery = { resetPassword: 'resetPassword' },
): Promise<FetchResult<ResetPasswordMutation>> => {
  const { resetPassword } = context.extendQuery(customQuery, {
    resetPassword: {
      query: resetPasswordMutation,
      variables: input,
    },
  });

  Logger.debug('[VSF: Magento] requestPasswordResetEmail', JSON.stringify(input, null, 2));
  const result = await context.client
    .mutate<ResetPasswordMutation, ResetPasswordMutationVariables>({
    mutation: resetPassword.query,
    variables: resetPassword.variables,
  });

  if (!result.data.resetPassword) throw new Error('It was not possible to change the user password.');

  return result;
};
