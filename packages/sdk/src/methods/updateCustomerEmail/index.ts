import { CustomQuery, MethodOptions } from '../../types';
import { UpdateCustomerEmailMutation, UpdateCustomerEmailMutationVariables } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * updateCustomerEmail response type
 */
export type UpdateCustomerEmailResponse<T extends DeepPartial<UpdateCustomerEmailMutation> = UpdateCustomerEmailMutation> = ApolloQueryResult<T>

/**
 * Method to update customer email
 *
 * @remarks
 * This method communicates with the
 * {@link @vue-storefront/magento-api#ApiMethods.updateCustomerEmail | updateCustomerEmail } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vue-storefront/magento-api#updateCustomerEmail | here}.
 *
 * @param params -
 * Parameter object which can be used with this method.
 * Refer to its type definition to learn about possible properties.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#UpdateCustomerEmailResponse | UpdateCustomerEmailResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // update customer
 * const result = await sdk.magento.updateCustomerEmail({ email: "johndoe@example.com", password: "hunter2" });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for updating customer
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'update-customer-email-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation updateCustomerEmail($email: String!, $password: String!) {
 *                updateCustomerEmail(email: $email, password: $password){
 *                  customer {
 *                    ${metadata.fields}
 *                  }
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
 * Using a custom GraphQL query to update customer
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   updateCustomerEmail: 'update-customer-email-custom-query',
 *   metadata: {
 *     fields: 'email firstname'
 *   }
 * };
 *
 * const result = await sdk.magento.updateCustomerEmail({ email: "johndoe@example.com", password: "hunter2" }, { customQuery });
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
export async function updateCustomerEmail<RES extends UpdateCustomerEmailResponse>(params: UpdateCustomerEmailMutationVariables, options?: MethodOptions<CustomQuery<'updateCustomerEmail'>>) {
  const { data } = await client.post<RES>(
    'updateCustomerEmail',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
