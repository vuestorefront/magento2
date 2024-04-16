import type { ApolloQueryResult } from "@apollo/client/core";
import type {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  UpsellProductsQuery,
  UpsellProductsQueryVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import upsellProductsQuery from "./upsellProducts";
import type { Context } from "../../types/context";
import getHeaders from "../getHeaders";

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

/**
 * Get upsell products for a given product.
 *
 * @example
 * Simple usage without filters, sorting or pagination:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of upsell-products with default parameters
 * const upsellProducts = await sdk.magento.upsellProducts({});
 * ```
 *
 * @example
 * Usage with filters, sorting and pagination:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of products with upsell products
 * const upsellProducts = await sdk.magento.upsellProducts({
 *  pageSize: 20,
 *  currentPage: 1,
 *  filter: {
 *    sku: {
 *      eq: PRODUCT_SKU
 *    }
 *  }
 * });
 * ```
 *
 * @example
 * Creating a custom GraphQL query for getting upsellProducts.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'upsell-products-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query upsellProducts(
 *                $search: String = "",
 *                $filter: ProductAttributeFilterInput,
 *                $pageSize: Int = 10,
 *                $currentPage: Int = 1,
 *                $sort: ProductAttributeSortInput
 *              ) {
 *                products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
 *                  ${metadata.fields}
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
 * Using a custom GraphQL query to fetch upsell-products.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  upsellProducts: 'upsell-products-custom-query',
 *    metadata: {
 *      fields: 'items { sku name upsell_products { sku } }'
 *    }
 * };
 *
 * const upsellProducts = await sdk.magento.upsellProducts({
 *  filter: {
 *    sku: {
 *      eq: 'some-sku' // optional SKU filter
 *    }
 *  }
 * }, customQuery);
 *
 * // upsellProducts will contain only the fields specified in the custom query.
 * ```
 */
export async function upsellProducts(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { upsellProducts: "upsellProducts" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<UpsellProductsQuery>> {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { upsellProducts: upsellProductsGQL } = context.extendQuery(customQuery, {
    upsellProducts: {
      query: upsellProductsQuery,
      variables,
    },
  });

  try {
    return await context.client.query<UpsellProductsQuery, UpsellProductsQueryVariables>({
      query: gql`
        ${upsellProductsGQL.query}
      `,
      variables: upsellProductsGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
