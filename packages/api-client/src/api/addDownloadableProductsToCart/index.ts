import { FetchResult } from "@apollo/client/core";
import {
  CustomQuery,
  AddDownloadableProductsToCartInput,
  AddDownloadableProductsToCartMutation,
  AddDownloadableProductsToCartMutationVariables,
} from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import type { Context } from "../../types/context";
import addDownloadableProductsToCartMutation from "./addDownloadableProductsToCart";
import getHeaders from "../getHeaders";

/**
 * Adds a set of downloadable products to a specified cart
 */
export async function addDownloadableProductsToCart(
  context: Context,
  input: AddDownloadableProductsToCartInput,
  customQuery: CustomQuery = { addDownloadableProductsToCart: "addDownloadableProductsToCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddDownloadableProductsToCartMutation>> {
  const { addDownloadableProductsToCart: addDownloadableProductsToCartGQL } = context.extendQuery(customQuery, {
    addDownloadableProductsToCart: {
      query: addDownloadableProductsToCartMutation,
      variables: { input },
    },
  });
  return context.client.mutate<AddDownloadableProductsToCartMutation, AddDownloadableProductsToCartMutationVariables>({
    mutation: addDownloadableProductsToCartGQL.query,
    variables: addDownloadableProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
