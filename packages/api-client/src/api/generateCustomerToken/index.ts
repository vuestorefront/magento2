import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { GraphQLError } from 'graphql';
import recaptchaHelper from '../../helpers/recaptcha/recaptchaHelper';
import generateCustomerToken from './generateCustomerToken';
import {
  GenerateCustomerTokenMutation,
  GenerateCustomerTokenMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  params: {
    email: string;
    password: string;
    recaptchaToken: string;
  },
  customQuery: CustomQuery = { generateCustomerToken: 'generateCustomerToken' },
): Promise<FetchResult<GenerateCustomerTokenMutation>> => {
  try {
    /**
     * recaptcha token verification
     */
    const response = await recaptchaHelper(context.config.recaptcha.secretkey, params.recaptchaToken);

    if (!response.success) {
      return {
        errors: [new GraphQLError('Invalid token')],
        data: null,
      };
    }

    const { generateCustomerToken: generateCustomerTokenGQL } = context.extendQuery(
      customQuery,
      {
        generateCustomerToken: {
          query: generateCustomerToken,
          variables: {
            email: params.email,
            password: params.password,
          },
        },
      },
    );

    return await context.client
      .mutate<GenerateCustomerTokenMutation, GenerateCustomerTokenMutationVariables>({
      mutation: generateCustomerTokenGQL.query,
      variables: generateCustomerTokenGQL.variables,
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
