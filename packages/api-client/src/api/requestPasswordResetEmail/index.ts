import { FetchResult } from "@apollo/client/core";
import { GraphQLError } from "graphql";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { RequestPasswordResetEmailMutation, RequestPasswordResetEmailMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import consola from "consola";
import recaptchaValidator from "../../helpers/recaptcha/recaptchaValidator";
import requestPasswordResetEmailMutation from "./requestPasswordResetEmail";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Requests a password reset email to be sent to the user
 * @param context VSF Context
 * @param input Email for which to request a password reset
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export async function requestPasswordResetEmail(
  context: Context,
  input: RequestPasswordResetEmailMutationVariables,
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<RequestPasswordResetEmailMutation>> {
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

  consola.debug("[VSF: Magento] requestPasswordResetEmail", JSON.stringify(input, null, 2));
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
