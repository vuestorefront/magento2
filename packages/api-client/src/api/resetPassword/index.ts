import { FetchResult } from '@apollo/client/core';
import { CustomQuery, Logger } from '@vue-storefront/core';
import { GraphQLError } from 'graphql';
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import resetPasswordMutation from './resetPassword';
import { Context } from '../../types/context';
import recaptchaValidator from '../../helpers/recaptcha/recaptchaValidator';
import getHeaders from '../getHeaders';

/**
 * Resets a user's password
 * @param context VSF Context
 * @param input Params used to reset a user's password
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function resetPassword(
  context: Context,
  input: ResetPasswordMutationVariables,
  customQuery: CustomQuery = { resetPassword: 'resetPassword' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<ResetPasswordMutation>> {
  const {
    recaptchaToken, ...variables
  } = input;

  if (context.config.recaptcha.isEnabled) {
    /**
     * recaptcha token verification
     */
    const response = await recaptchaValidator(context, recaptchaToken);

    if (!response.success) {
      return {
        errors: [new GraphQLError('Error during reCaptcha verification. Please try again.')],
        data: null,
      };
    }
  }

  const { resetPassword: extendedResetPasswordMutation } = context.extendQuery(customQuery, {
    resetPassword: {
      query: resetPasswordMutation,
      variables: { ...variables },
    },
  });

  Logger.debug('[VSF: Magento] requestPasswordResetEmail', JSON.stringify(input, null, 2));
  const result = await context.client
    .mutate<ResetPasswordMutation, ResetPasswordMutationVariables>({
    mutation: extendedResetPasswordMutation.query,
    variables: extendedResetPasswordMutation.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });

  if (!result.data.resetPassword) throw new Error('It was not possible to change the user password.');

  return result;
}
