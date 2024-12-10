import { FetchResult } from "@apollo/client/core";
import { GraphQLError } from "graphql";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { RequestPasswordResetEmailMutation, RequestPasswordResetEmailMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { getLogger } from "@vue-storefront/middleware";
import recaptchaValidator from "../../helpers/recaptcha/recaptchaValidator";
import requestPasswordResetEmailMutation from "./requestPasswordResetEmail";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Request password reset email
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // trigger sending of password reset email
 * const result = await sdk.magento.requestPasswordResetEmail({ email: 'john.doe@gmail.com'});
 *
 * // result.data.requestPasswordResetEmail contains the boolean response from the API
 * ```
 */
export async function requestPasswordResetEmail(
  context: Context,
  input: RequestPasswordResetEmailMutationVariables,
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<RequestPasswordResetEmailMutation>> {
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

  logger.debug(`Requesting password reset email with input`, { input });
  const result = await context.client.mutate<RequestPasswordResetEmailMutation, RequestPasswordResetEmailMutationVariables>({
    mutation: gql`
      ${requestPasswordResetEmailMutation}
    `,
    variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });

  if (!result.data.requestPasswordResetEmail) throw new Error("Email was not found, or not available.");

  return result;
}
