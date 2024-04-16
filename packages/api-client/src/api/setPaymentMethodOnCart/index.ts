import { FetchResult } from "@apollo/client/core";
import type {
  CustomHeaders,
  SetPaymentMethodOnCartInputs,
  SetPaymentMethodOnCartMutation,
  SetPaymentMethodOnCartMutationVariables,
} from "@vue-storefront/magento-types";
import { CustomQuery } from "@vue-storefront/magento-types";

import gql from "graphql-tag";
import setPaymentMethodOnCartMutation from "./setPaymentMethodOnCart";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Set payment method on cart.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const params = {
 *   cart_id: 'some-cart-id'
 *   payment_method: {
 *     code: 'checkmo'
 *   }
 * };
 *
 * // sets payment method on cart and return payment information
 * // data contains properties like `available_payment_methods` and `selected_payment_method`
 * const { data } = await sdk.magento.setPaymentMethodOnCart(params);
 * ```
 *
 * @example
 * Creating a custom GraphQL query for configuring the response data structure
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'set-payment-method-on-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation setPaymentMethodOnCart($input: SetPaymentMethodOnCartInput) {
 *                setPaymentMethodOnCart(input: $input) {
 *                  cart {
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
 * Using a custom GraphQL query created with the `set-payment-method-on-cart-custom-query` in the previous example
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   setPaymentMethodOnCart: 'set-payment-method-on-cart-custom-query',
 *   metadata: {
 *     fields: 'available_payment_methods { code title }'
 *   }
 * };
 *
 * // Params and options are the same as in the previous example
 * const { data } = await sdk.magento.setPaymentMethodOnCart(params, customQuery);
 *
 * // data contains only the properties selected in the custom query
 * ```
 */
export async function setPaymentMethodOnCart(
  context: Context,
  input: SetPaymentMethodOnCartInputs,
  customQuery: CustomQuery = { setPaymentMethodOnCart: "setPaymentMethodOnCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<SetPaymentMethodOnCartMutation>> {
  const { setPaymentMethodOnCart: setPaymentMethodOnCartGQL } = context.extendQuery(customQuery, {
    setPaymentMethodOnCart: {
      query: setPaymentMethodOnCartMutation,
      variables: { input },
    },
  });

  return context.client.mutate<SetPaymentMethodOnCartMutation, SetPaymentMethodOnCartMutationVariables>({
    mutation: gql`
      ${setPaymentMethodOnCartGQL.query}
    `,
    variables: setPaymentMethodOnCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
