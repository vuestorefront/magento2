import { FetchResult } from '@apollo/client/core';
import { CustomQuery, Logger } from '@vue-storefront/core';
import { GraphQLError } from 'graphql';
import recaptchaValidator from '../../helpers/recaptcha/recaptchaValidator';
import requestPasswordResetEmailMutation from './requestPasswordResetEmail';
import {
  RequestPasswordResetEmailMutation,
  RequestPasswordResetEmailMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

/**
 * Requests a password reset email to be sent to the user
 * @param context VSF Context
 * @param input Email for which to request a password reset
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 */
export default async function requestPasswordResetEmail(
  context: Context,
  input: RequestPasswordResetEmailMutationVariables,
  customQuery: CustomQuery = { requestPasswordResetEmail: 'requestPasswordResetEmail' },
): Promise<FetchResult<RequestPasswordResetEmailMutation>> {
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

  const { requestPasswordResetEmail: extendedMutation } = context.extendQuery(customQuery, {
    requestPasswordResetEmail: {
      query: requestPasswordResetEmailMutation,
      variables: { ...variables },
    },
  });

  Logger.debug('[VSF: Magento] requestPasswordResetEmail', JSON.stringify(input, null, 2));
  const result = await context.client
    .mutate<RequestPasswordResetEmailMutation, RequestPasswordResetEmailMutationVariables>({
    mutation: extendedMutation.query,
    variables: extendedMutation.variables,
  });

  if (!result.data.requestPasswordResetEmail) throw new Error('Email was not found, or not available.');

  return result;
}
