import { FetchResult } from "@apollo/client/core";
import {
  CustomQuery,
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AddSimpleProductsToCartMutationVariables,
} from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import addSimpleProductsToCartQuery from "./addSimpleProductsToCart";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Add simple products to cart.
 */
export async function addSimpleProductsToCart(
  context: Context,
  input: AddSimpleProductsToCartInput,
  customQuery: CustomQuery = { addSimpleProductsToCart: "addSimpleProductsToCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddSimpleProductsToCartMutation>> {
  const { addSimpleProductsToCart: addSimpleProductsToCartGQL } = context.extendQuery(customQuery, {
    addSimpleProductsToCart: {
      query: addSimpleProductsToCartQuery,
      variables: { input },
    },
  });
  return context.client.mutate<AddSimpleProductsToCartMutation, AddSimpleProductsToCartMutationVariables>({
    mutation: addSimpleProductsToCartGQL.query,
    variables: addSimpleProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
