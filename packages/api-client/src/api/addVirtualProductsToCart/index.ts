import { FetchResult } from "@apollo/client/core";
import {
  CustomQuery,
  AddVirtualProductsToCartInput,
  AddVirtualProductsToCartMutation,
  AddVirtualProductsToCartMutationVariables,
} from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import type { Context } from "../../types/context";
import addVirtualProductsToCartMutation from "./addVirtualProductsToCart";
import getHeaders from "../getHeaders";

/**
 * Adds a set of virtual products to a specified cart
 */
export async function addVirtualProductsToCart(
  context: Context,
  input: AddVirtualProductsToCartInput,
  customQuery: CustomQuery = { addVirtualProductsToCart: "addVirtualProductsToCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddVirtualProductsToCartMutation>> {
  const { addVirtualProductsToCart: addVirtualProductsToCartGQL } = context.extendQuery(customQuery, {
    addVirtualProductsToCart: {
      query: addVirtualProductsToCartMutation,
      variables: { input },
    },
  });
  return context.client.mutate<AddVirtualProductsToCartMutation, AddVirtualProductsToCartMutationVariables>({
    mutation: addVirtualProductsToCartGQL.query,
    variables: addVirtualProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
