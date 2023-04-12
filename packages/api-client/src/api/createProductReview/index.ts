import { FetchResult } from '@apollo/client/core';
import { CustomQuery, CreateProductReviewMutation, CreateProductReviewInput } from '@vsf-enterprise/magento-api-types';
import { GraphQLError } from 'graphql';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import createProductReview from './createProductReview';
import { Context } from '../../types/context';
import recaptchaValidator from '../../helpers/recaptcha/recaptchaValidator';
import getHeaders from '../getHeaders';

/**
 * Creates a new product review
 */
export default async (
  context: Context,
  input: CreateProductReviewInput,
  customQuery: CustomQuery = { createProductReview: 'createProductReview' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<CreateProductReviewMutation>> => {
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

  const { createProductReview: createProductReviewGQL } = context.extendQuery(
    customQuery,
    {
      createProductReview: {
        query: createProductReview,
        variables: { input: variables },
      },
    },
  );

  return context.client.mutate<CreateProductReviewMutation, { input: CreateProductReviewInput }>({
    mutation: createProductReviewGQL.query,
    variables: createProductReviewGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
