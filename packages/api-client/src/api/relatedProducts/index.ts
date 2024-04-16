import type { ApolloQueryResult } from "@apollo/client/core";
import type {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  RelatedProductsQuery,
  RelatedProductsQueryVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import relatedProductsQuery from "./relatedProducts";
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
 * Get related products
 *
 * @example
 * Simple usage without filters, sorting or pagination:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Fetch list of products filtered by the SKU
 * // Only the parent product is affected by filters
 * const products = await sdk.magento.relatedProduct({
 *  pageSize: 1,
 *  filter: {
 *    sku: {
 *      eq: PRODUCT_SKU
 *    }
 *  }
 * });
 * ```
 *
 * @example
 * Usage with filters, sorting and pagination:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of products with custom parameters
 * const products = await sdk.magento.relatedProduct({
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
 * Creating a custom GraphQL query getting related products.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'related-product-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query relatedProduct(
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
 * Using a custom GraphQL query to fetch related products.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  relatedProduct: 'related-product-custom-query',
 *    metadata: {
 *      fields: 'items { related_products { uid __typename } }'
 *    }
 * };
 *
 * const result = await sdk.magento.relatedProduct({
 *  filter: {
 *    sku: {
 *      eq: 'some-sku' // optional SKU filter
 *    }
 *  }
 * }, customQuery);
 *
 * // Result will contain only the fields specified in the custom query.
 * ```
 */
export async function relatedProducts(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { relatedProducts: "relatedProducts" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<RelatedProductsQuery>> {
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

  const { relatedProducts: relatedProductsGQL } = context.extendQuery(customQuery, {
    relatedProducts: {
      query: relatedProductsQuery,
      variables,
    },
  });

  try {
    return await context.client.query<RelatedProductsQuery, RelatedProductsQueryVariables>({
      query: gql`
        ${relatedProductsGQL.query}
      `,
      variables: relatedProductsGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
