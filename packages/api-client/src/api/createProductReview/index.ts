import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CreateProductReviewInput, CreateProductReviewMutation } from "@vue-storefront/magento-types";
import { GraphQLError } from "graphql";
import gql from "graphql-tag";
import createProductReviewQuery from "./createProductReview";
import { Context } from "../../types/context";
import recaptchaValidator from "../../helpers/recaptcha/recaptchaValidator";
import getHeaders from "../getHeaders";

/**
 * Creates a new product review
 */
export async function createProductReview(
  context: Context,
  input: CreateProductReviewInput,
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<CreateProductReviewMutation>> {
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

  return context.client.mutate<CreateProductReviewMutation, { input: CreateProductReviewInput }>({
    mutation: gql`
      ${createProductReviewQuery}
    `,
    variables: { input: variables },
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
