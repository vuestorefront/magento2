import type { FetchResult } from "@apollo/client/core";
import type {
  CustomHeaders,
  CustomQuery,
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartMutation,
  SetShippingMethodsOnCartMutationVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import setShippingMethodsOnCartMutation from "./setShippingMethodsOnCart";
import type { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Set shipping methods on cart.
 * Before using this method, you need to set shipping address on cart.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Assuming that shipping address is already set on cart.
 * // if not, you need to set shipping address on cart first.
 *
 * const params = {
 *   cart_id: 'some-cart-id',
 *   shipping_methods: [
 *     {
 *       carrier_code: 'flatrate',
 *       method_code: 'flatrate'
 *     }
 *   ]
 * };
 *
 * const { data } = await sdk.magento.setShippingMethodsOnCart(params);
 *
 * // you can get set shipping methods on cart response from
 * // data?.setShippingMethodsOnCart?.cart?.shipping_addresses?.[0]?.selected_shipping_method?.method_code
 * ```
 *
 * @example
 * Creating a custom GraphQL query to change the amount of fields returned by the query, when compared to the default query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'set-shipping-methods-on-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
 *                setShippingMethodsOnCart(input: $input) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * // you will get only selected_shipping_method.method_code field
 *
 * const customQuery = {
 *   setShippingMethodsOnCart: 'set-shipping-methods-on-cart-custom-query',
 *   metadata: {
 *     fields: 'shipping_addresses { selected_shipping_method { method_code } }'
 *   }
 * };
 *
 * const params = {
 *   cart_id: 'some-cart-id',
 *   shipping_methods: [
 *     {
 *       carrier_code: 'flatrate',
 *       method_code: 'flatrate'
 *     }
 *   ]
 * };
 *
 * const { data } = await sdk.magento.setShippingMethodsOnCart(params, customQuery);
 *
 * // data will contain only the fields specified in the custom query.
 * ```
 */
export async function setShippingMethodsOnCart(
  context: Context,
  input: SetShippingMethodsOnCartInput,
  customQuery: CustomQuery = { setShippingMethodsOnCart: "setShippingMethodsOnCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<SetShippingMethodsOnCartMutation>> {
  const { setShippingMethodsOnCart: setShippingMethodsOnCartGQL } = context.extendQuery(customQuery, {
    setShippingMethodsOnCart: {
      query: setShippingMethodsOnCartMutation,
      variables: { input },
    },
  });

  return context.client.mutate<SetShippingMethodsOnCartMutation, SetShippingMethodsOnCartMutationVariables>({
    mutation: gql`
      ${setShippingMethodsOnCartGQL.query}
    `,
    variables: setShippingMethodsOnCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
