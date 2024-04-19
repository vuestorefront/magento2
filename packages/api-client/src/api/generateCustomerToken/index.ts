import { FetchResult } from "@apollo/client/core";
import { CustomQuery, GenerateCustomerTokenMutation, GenerateCustomerTokenMutationVariables } from "@vue-storefront/magento-types";
import { GraphQLError } from "graphql";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import recaptchaValidator from "../../helpers/recaptcha/recaptchaValidator";
import generateCustomerTokenQuery from "./generateCustomerToken";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Generate customer token
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch token
 * const result = await sdk.magento.generateCustomerToken({
 *   email: 'some-email',
 *   password: 'some-password'
 * });
 *
 * // Token is now available in result.data.generateCustomerToken.token
 * ```
 *
 *  * @example
 * Creating a custom GraphQL query to fetch additional data:
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'generate-customer-token-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation generateCustomerToken($email: String!, $password: String!) {
 *                generateCustomerToken(email: $email, password: $password) {
 *                  ${metadata.fields}
 *                }
 *              }
 *            }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   route: 'generate-customer-token-custom-query',
 *   metadata: {
 *     fields: 'token additional_field'
 *   }
 * };
 *
 * // data will contain only the fields specified in the custom query.
 * const result = await sdk.magento.generateCustomerToken({
 *   email: 'some-email',
 *   password: 'some-password'
 * }, customQuery);
 * ```
 */
export async function generateCustomerToken(
  context: Context,
  params: {
    email: string;
    password: string;
    recaptchaToken: string;
  },
  customQuery: CustomQuery = { generateCustomerToken: "generateCustomerToken" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<GenerateCustomerTokenMutation>> {
  try {
    if (context.config.recaptcha.isEnabled) {
      /**
       * recaptcha token verification
       */
      const response = await recaptchaValidator(context, params.recaptchaToken);

      if (!response.success) {
        return {
          errors: [new GraphQLError("Error during reCaptcha verification. Please try again.")],
          data: null,
        };
      }
    }

    const { generateCustomerToken: generateCustomerTokenGQL } = context.extendQuery(customQuery, {
      generateCustomerToken: {
        query: generateCustomerTokenQuery,
        variables: {
          email: params.email,
          password: params.password,
        },
      },
    });

    return await context.client.mutate<GenerateCustomerTokenMutation, GenerateCustomerTokenMutationVariables>({
      mutation: gql`
        ${generateCustomerTokenGQL.query}
      `,
      variables: generateCustomerTokenGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
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
}
