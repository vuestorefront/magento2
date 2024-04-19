import gql from "graphql-tag";
import { FetchPolicy, FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Send an arbitrary GraphQL mutation to the Magento GraphQL endpoint
 * For sending query, please see {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/customQuery | customQuery}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Prepare custom mutation
 * // Do not use gql-tag (gql``) here.
 * // For syntax highlighting (provided by respective IDE extensions), add the `#graphql` comment at the start of the template string
 * const mutation = `#graphql
 *  mutation generateCustomerToken($email: String!, $password: String!) {
 *    generateCustomerToken(email: $email, password: $password) {
 *      token
 *    }
 *  }
 *`;
 *
 * // Prepare mutation variables
 * const mutationVariables = {
 *  email: TEST_USER_EMAIL,
 *  password: TEST_USER_PASSWORD
 * };
 *
 * // use custom mutation and variables to fetch response adjusted to your needs
 * const result = await sdk.magento.customMutation({
 *  mutation,
 *  mutationVariables
 * });
 * ```
 */
export async function customMutation<MUTATION = any, MUTATION_VARIABLES = any>(
  context: Context,
  {
    mutation,
    mutationVariables,
    fetchPolicy,
    customHeaders,
  }: {
    mutation: string;
    mutationVariables: MUTATION_VARIABLES;
    fetchPolicy?: Extract<FetchPolicy, "network-only" | "no-cache">;
    customHeaders?: CustomHeaders;
  }
): Promise<FetchResult<MUTATION>> {
  return context.client.mutate<MUTATION, MUTATION_VARIABLES>({
    mutation: gql`
      ${mutation}
    `,
    variables: { ...mutationVariables },
    fetchPolicy: fetchPolicy || "no-cache",
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
