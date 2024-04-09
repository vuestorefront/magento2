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
 * Registers a new customer. To override the default query, use the `createCustomer` query key.
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
