import { CustomQuery, MethodOptions } from '../../types';
import { CreateCustomerAddressMutation, CustomerAddressInput } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * createCustomerAddress response type
 */
export type CreateCustomerAddressResponse<T extends DeepPartial<CreateCustomerAddressMutation> = CreateCustomerAddressMutation> = FetchResult<T>

/**
 * Method to create a customer address.
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.createCustomerAddress | createCustomerAddress } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#createCustomerAddress | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#CreateCustomerAddressResponse | CreateCustomerAddressResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const address: CustomerAddressInput = {
 *  city: 'some city',
 *  country_code: CountryCodeEnum.Us,
 *  default_billing: false,
 *  default_shipping: false,
 *  firstname: 'John',
 *  lastname: 'Doe',
 *  postcode: '08701',
 *  street: ['street'],
 *  telephone: '123123123',
 *  region: {
 *    region_code: 'NJ',
 *    region_id: 41,
 *    region: 'New Jersey'
 *  }
 * };
 *
 * // customer address will be created for the currently logged in customer
 * await sdk.magento.createCustomerAddress(address);
 * ```
 *
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'create-customer-address-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation createCustomerAddress($input: CustomerAddressInput!) {
 *                createCustomerAddress(input: $input) {
 *                  ${metadata.fields}
 *                }
 *               }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to reduce the amount of data returned by the API
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   createCustomerAddress: 'create-customer-address-custom-query',
 *   metadata: {
 *     fields: 'id city'
 *   }
 * };
 *
 * // address parameter is the same as in the simple usage example
 * const result = await sdk.magento.createCustomerAddress(address, { customQuery });
 *
 * result.data.createCustomerAddress.city; // 'some city'
 * ```
 */
export async function createCustomerAddress<RES extends CreateCustomerAddressResponse>(params: CustomerAddressInput, options?: MethodOptions<CustomQuery<'createCustomerAddress'>>) {
  const { data } = await client.post<RES>(
    'createCustomerAddress',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
