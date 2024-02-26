import { Mutation, UpdateCustomerAddressMutationVariables } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link updateCustomerAddress} method.
 */
export type UpdateCustomerAddressMutation = { updateCustomerAddress: Mutation['updateCustomerAddress'] };

/**
 * updateCustomerAddress response type
 */
export type UpdateCustomerAddressResponse<
  T extends DeepPartial<UpdateCustomerAddressMutation> = UpdateCustomerAddressMutation,
> = ApolloQueryResult<T>;

/**
 * Method to update customer address
 * The user needs to be logged in in order to send this request
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/updateCustomerAddress | updateCustomerAddress } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/updateCustomerAddress | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/UpdateCustomerAddressResponse | UpdateCustomerAddressResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch updated customer address
 * const result = await sdk.magento.updateCustomerAddress();
 * ```
 *
 * @example
 * Creating a custom GraphQL query for updating customer address
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'update-customer-address-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation updateCustomerAddress($id: Int!, $input: CustomerAddressInput) {
 *                updateCustomerAddress(id: $id, input: $input) {
 *                  ${metadata.fields}
 *                }
 *              }
 *              `
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to update customer address
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   updateCustomerAddress: 'update-customer-address-custom-query',
 *   metadata: {
 *     fields: 'id city company'
 *   }
 * };
 *
 * const result = await sdk.magento.updateCustomerAddress({ id: 308, input: { city: "Warsaw" }  }, { customQuery });
 *
 * // result will contain only the fields specified in the custom query.
 * ```
 */
export async function updateCustomerAddress<RES extends UpdateCustomerAddressResponse>(
  params: UpdateCustomerAddressMutationVariables,
  options?: MethodOptions<CustomQuery<'updateCustomerAddress'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('updateCustomerAddress')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
