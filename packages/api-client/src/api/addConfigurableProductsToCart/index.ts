import { FetchResult } from "@apollo/client/core";
import {
  CustomQuery,
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartMutation,
  AddConfigurableProductsToCartMutationVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import type { Context } from "../../types/context";
import addConfigurableProductsToCartMutation from "./addConfigurableProductsToCart";
import getHeaders from "../getHeaders";

/**
 * Adds a set of configurable products to a specified cart
 * @param context VSF Context
 * @param input ID of the cart and products to be added
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export async function addConfigurableProductsToCart(
  context: Context,
  input: AddConfigurableProductsToCartInput,
  customQuery: CustomQuery = { addConfigurableProductsToCart: "addConfigurableProductsToCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddConfigurableProductsToCartMutation>> {
  const { addConfigurableProductsToCart: addConfigurableProductsToCartGQL } = context.extendQuery(customQuery, {
    addConfigurableProductsToCart: {
      query: addConfigurableProductsToCartMutation,
      variables: { input },
    },
  });
  return context.client.mutate<any, AddConfigurableProductsToCartMutationVariables>({
    mutation: gql`
      ${addConfigurableProductsToCartGQL.query}
    `,
    variables: addConfigurableProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
