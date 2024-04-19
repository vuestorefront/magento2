import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CreateCustomerMutation, CreateCustomerMutationVariables, CustomerCreateInput, CustomQuery } from "@vue-storefront/magento-types";
import { GraphQLError } from "graphql";
import gql from "graphql-tag";
import recaptchaValidator from "../../helpers/recaptcha/recaptchaValidator";
import createCustomerQuery from "./createCustomer";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Create a new customer.
 *
 * @example
 * Simple usage with basic customer data:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const params = {
 *   email: 'john.doe@gmail.com'
 *   firstname: 'John',
 *   lastname: 'Doe',
 * }
 *
 * const result = await sdk.magento.createCustomer(params);
 * ```
 @example
 * Creating a custom GraphQL query for creating a customer
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'create-customer-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query customer {
 *                customer {
 *                  ${metadata.fields}
 *                }
 *              }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to fetch customer
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 *
 * const customQuery = {
 *   customer: 'create customer-custom-query',
 *   metadata: {
 *     fields: 'email firstname lastname'
 *   }
 * };
 *
 * const params = {
 *   email: 'john.doe@gmail.com'
 *   firstname: 'John',
 *   lastname: 'Doe',
 * }
 *
 * const result = await sdk.magento.createCustomer(params, customQuery)
 *
 * // result will contain only the fields specified in the custom query.
 * ```
 */
export async function createCustomer(
  context: Context,
  input: CustomerCreateInput,
  customQuery: CustomQuery = { createCustomer: "createCustomer" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<CreateCustomerMutation>> {
  try {
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

    const { createCustomer: createCustomerGQL } = context.extendQuery(customQuery, {
      createCustomer: {
        query: createCustomerQuery,
        variables: { input: variables },
      },
    });

    return await context.client.mutate<CreateCustomerMutation, CreateCustomerMutationVariables>({
      mutation: gql`
        ${createCustomerGQL.query}
      `,
      variables: createCustomerGQL.variables,
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
