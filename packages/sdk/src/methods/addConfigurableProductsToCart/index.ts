import type { AddConfigurableProductsToCartInput, Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link addConfigurableProductsToCart} method.
 */
export type AddConfigurableProductsToCart = {
  addConfigurableProductsToCart: Mutation['addConfigurableProductsToCart'];
};

/**
 * Add products to cart response type
 */
export type AddConfigurableProductsToCartResponse<
  T extends DeepPartial<AddConfigurableProductsToCart> = AddConfigurableProductsToCart,
> = ApolloQueryResult<T>;

/**
 * Method to add configurable products to cart (returns cart)
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/addConfigurableProductsToCart | addConfigurableProductsToCart} endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/addConfigurableProductsToCart | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/AddProductsToCartResponse | AddProductsToCartResponse}.
 *
 * @example
 * Adding configurable products to cart with default parameters.
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const cart = await sdk.magento.addConfigurableProductsToCart(
 *   {
 *     cart_id: '123',
 *     cart_items: [
 *       {
 *        data: {
 *          quantity: 1,
 *          sku: 'MH01-XS-Black',
 *        },
 *        parent_sku: 'MH01',
 *        customizable_options: [],
 *       }
 *     ]
 *   }
 * );
 * ```
 *
 * @example
 * Creating a custom GraphQL query for adding configurable products to cart
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'add-configurable-products-to-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation addConfigurableProductsToCart($input: AddConfigurableProductsToCartInput) {
 *                addConfigurableProductsToCart(input: $input) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }`,
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to modify response containing the cart, which is sent as part of the adding product to cart mutation
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   cart: 'add-configurable-products-to-cart-custom-query',
 *   metadata: {
 *     fields: 'id items { uid }'
 *   }
 * };
 *
 *
 * const cart = await sdk.magento.addConfigurableProductsToCart(
 *   {
 *     cart_id: '123',
 *     cart_items: [
 *       {
 *        data: {
 *          quantity: 1,
 *          sku: 'MH01-XS-Black',
 *        },
 *        parent_sku: 'MH01',
 *        customizable_options: [],
 *       }
 *     ]
 *   },
 *   { customQuery }
 * );
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
export async function addConfigurableProductsToCart<RES extends AddConfigurableProductsToCartResponse>(
  params: AddConfigurableProductsToCartInput,
  options?: MethodOptions<CustomQuery<'addConfigurableProductsToCart'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('addConfigurableProductsToCart')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
