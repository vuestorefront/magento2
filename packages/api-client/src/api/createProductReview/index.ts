import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { GraphQLError } from 'graphql';
import { CreateProductReviewMutation, CreateProductReviewInput } from '../../types/GraphQL';
import createProductReview from './createProductReview';
import { Context } from '../../types/context';
import recaptchaValidator from '../../helpers/recaptcha/recaptchaValidator';

export default async (
  context: Context,
  input: CreateProductReviewInput,
  customQuery: CustomQuery = { createProductReview: 'createProductReview' },
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
  });
};
