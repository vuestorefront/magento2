import { ApolloQueryResult } from "@apollo/client/core";
import {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductsListQuery,
  ProductsListQueryVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { getLogger } from "@vue-storefront/middleware";
import productsListQuery from "./productsList";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

/**
 * Get products
 *
 * @example
 * Simple usage without filters, sorting or pagination:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of products with default parameters
 * const details = await sdk.magento.products({});
 * ```
 *
 * @example
 * Usage with filters, sorting and pagination:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of products with custom parameters
 * const details = await sdk.magento.products({
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
 * Creating a custom GraphQL query for fetching products.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'products-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query productsList(
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
 * Using a custom GraphQL query to fetch products list.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  products: 'products-custom-query',
 *    metadata: {
 *      fields: 'items { sku name }'
 *    }
 * };
 *
 * const products = await sdk.magento.products({
 *  filter: {
 *    sku: {
 *      eq: 'some-sku' // optional SKU filter
 *    }
 *  }
 * }, customQuery);
 *
 * // Products will contain only the fields specified in the custom query.
 * ```
 */
export async function products(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { products: "products" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<ProductsListQuery>> {
  const logger = getLogger(context);

  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize <= 0 ? 10 : defaultParams.pageSize,
    currentPage: defaultParams.currentPage <= 0 ? 1 : defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { products: productsGQL } = context.extendQuery(customQuery, {
    products: {
      query: productsListQuery,
      variables,
    },
  });

  try {
    return await context.client.query<ProductsListQuery, ProductsListQueryVariables>({
      query: gql`
        ${productsGQL.query}
      `,
      variables: productsGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      logger.error(error);

      return {
        ...error,
        errors: error.graphQLErrors,
        data: null,
      };
    }

    throw error.networkError?.result || error;
  }
}
