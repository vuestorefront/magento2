import type { ApolloQueryResult } from "@apollo/client/core";
import type {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQuery,
  ProductDetailsQueryVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { getLogger } from "@vue-storefront/middleware";
import productDetailsQuery from "./productDetailsQuery";
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
 * Get products details
 *
 * @example
 * Simple usage without filters, sorting or pagination:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of products with default parameters
 * const details = await sdk.magento.productDetails({});
 * ```
 *
 * @example
 * Usage with filters, sorting and pagination:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // make a request to fetch list of products with custom parameters
 * const details = await sdk.magento.productDetails({
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
 * Creating a custom GraphQL query for adding product details.
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'product-details-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query productDetails(
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
 * Using a custom GraphQL query to fetch product details.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * const customQuery = {
 *  productDetails: 'product-details-custom-query',
 *    metadata: {
 *      fields: 'items { sku name }'
 *    }
 * };
 *
 * const details = await sdk.magento.productDetails({
 *  filter: {
 *    sku: {
 *      eq: 'some-sku' // optional SKU filter
 *    }
 *  }
 * }, customQuery);
 *
 * // Details will contain only the fields specified in the custom query.
 * ```
 */
export async function productDetails(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { productDetails: "productDetails" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<ProductDetailsQuery>> {
  const logger = getLogger(context);

  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    ...defaultParams,
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { productDetails: productDetailGQL } = context.extendQuery(customQuery, {
    productDetails: {
      query: productDetailsQuery,
      variables,
    },
  });
  try {
    return await context.client.query<ProductDetailsQuery, ProductDetailsQueryVariables>({
      query: gql`
        ${productDetailGQL.query}
      `,
      variables: productDetailGQL.variables,
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
