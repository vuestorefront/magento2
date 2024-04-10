import { FetchPolicy } from '@apollo/client';
import { FetchResult } from '@apollo/client/core';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { MethodBaseOptions } from '../../types';
import { client } from '../../client';

/**
 * customQuery response type
 */
export type CustomMutationResponse<T> = FetchResult<T>;

/**
 * Custom mutation input type
 */
export type CustomMutationInput<TQueryVariables> = {
  mutation: string;
  mutationVariables?: TQueryVariables;
  fetchPolicy?: FetchPolicy;
};

/**
 * Method to send an arbitrary GraphQL mutation to the Magento GraphQL endpoint
 * For sending query, please see {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/customQuery | customQuery}.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link @vue-storefront/magento-api#ApiMethods.customMutation | customMutation } endpoint
 * of the Vue Storefront API Middleware.
 *
 * @param params -
 * Parameter object which can be used with this method.
 * Refer to its type definition to learn about possible properties.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam RES - Set response type of passed query
 * @typeParam INPUT - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CustomQueryResponse | CustomQueryResponse}.
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
 * const mutationVariables: GenerateCustomerTokenInput = {
 *  email: TEST_USER_EMAIL,
 *  password: TEST_USER_PASSWORD
 * };
 *
 * // use custom mutation and variables to fetch response adjusted to your needs
 * const result = await sdk.magento.customMutation<CustomMutationResponse<GenerateCustomerTokenMutation>, CustomMutationInput<GenerateCustomerTokenInput>>({
 *  mutation,
 *  mutationVariables
 * });
 * ```
 */
export async function customMutation<RES extends CustomMutationResponse<any>, INPUT extends CustomMutationInput<any>>(
  params: INPUT,
  options?: MethodBaseOptions,
) {
  return new AxiosRequestSender(client)
    .setUrl('customMutation')
    .setMethod('POST')
    .setProps({ ...params, customHeaders: options?.customHeaders })
    .setConfig(options?.clientConfig)
    .send<RES>();
}
