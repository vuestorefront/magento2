import { FetchResult } from "@apollo/client/core";
import { GraphQLError } from "graphql";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { ResetPasswordMutation, ResetPasswordMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { getLogger } from "@vue-storefront/middleware";
import resetPasswordMutation from "./resetPassword";
import { Context } from "../../types/context";
import recaptchaValidator from "../../helpers/recaptcha/recaptchaValidator";
import getHeaders from "../getHeaders";

/**
 * Reset customer password.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch resetPassword
 * const await sdk.magento.resetPassword({
 *   email: 'customer.email@gmail.com'
 *   newPassword: 'newPassword',
 *   resetPasswordToken: 'resetPasswordToken' // token obtained from email {@link @vue-storefront/magento-sdk#requestPasswordResetEmail}
 * });
 * ```
 */
export async function resetPassword(
  context: Context,
  input: ResetPasswordMutationVariables,
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<ResetPasswordMutation>> {
  const logger = getLogger(context);

  const { recaptchaToken, ...variables } = input;

  if (context.config.recaptcha.isEnabled) {
    /**
     * recaptcha token verification
     */
    const response = await recaptchaValidator(context, recaptchaToken);

    if (!response.success) {
      return {
        errors: [new GraphQLError("Error during reCaptcha verification. Please try again.")],
        data: null,
      };
    }
  }

  logger.debug("Initiating password reset request with input", { input });
  const result = await context.client.mutate<ResetPasswordMutation, ResetPasswordMutationVariables>({
    mutation: gql`
      ${resetPasswordMutation}
    `,
    variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });

  if (!result.data.resetPassword) throw new Error("It was not possible to change the user password.");

  return result;
}
