import { FetchResult } from '@apollo/client/core';
import { Logger } from '@vue-storefront/core';
import { GraphQLError } from 'graphql';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import { ResetPasswordMutation, ResetPasswordMutationVariables } from '@vsf-enterprise/magento-api-types';
import gql from 'graphql-tag';
import resetPasswordMutation from './resetPassword';
import { Context } from '../../types/context';
import recaptchaValidator from '../../helpers/recaptcha/recaptchaValidator';
import getHeaders from '../getHeaders';

/**
 * Resets a user's password
 * @param context VSF Context
 * @param input Params used to reset a user's password
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function resetPassword(
  context: Context,
  input: ResetPasswordMutationVariables,
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

  Logger.debug('[VSF: Magento] requestPasswordResetEmail', JSON.stringify(input, null, 2));
  const result = await context.client
    .mutate<ResetPasswordMutation, ResetPasswordMutationVariables>({
    mutation: gql`${resetPasswordMutation}`,
    variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });

  if (!result.data.resetPassword) throw new Error('It was not possible to change the user password.');

  return result;
}
