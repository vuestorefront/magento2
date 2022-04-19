import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { GraphQLError } from 'graphql';
import recaptchaValidator from '../../helpers/recaptcha/recaptchaValidator';
import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  CustomerCreateInput,
} from '../../types/GraphQL';
import createCustomer from './createCustomer';
import { Context } from '../../types/context';

/**
 * Registers a new customer. To override the default query, use the `createCustomer` query key.
 */
export default async (
  context: Context,
  input: CustomerCreateInput,
  customQuery: CustomQuery = { createCustomer: 'createCustomer' },
): Promise<FetchResult<CreateCustomerMutation>> => {
  try {
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

    const { createCustomer: createCustomerGQL } = context.extendQuery(
      customQuery,
      {
        createCustomer: {
          query: createCustomer,
          variables: { input: variables },
        },
      },
    );

    return await context
      .client
      .mutate<CreateCustomerMutation, CreateCustomerMutationVariables>({
      mutation: createCustomerGQL.query,
      variables: createCustomerGQL.variables,
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      return {
        errors: error.graphQLErrors,
        data: null,
      };
    }
    throw error.networkError?.result || error;
  }
};
