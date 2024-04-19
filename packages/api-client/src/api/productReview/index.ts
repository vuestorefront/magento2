import { ApolloQueryResult } from "@apollo/client/core";
import {
  CustomHeaders,
  CustomQuery,
  GetProductSearchParams,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductReviewQuery,
  ProductReviewQueryVariables,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import productReviewQuery from "./productReview";
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
 * Fetch product reviews
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch all products reviews (default pagination limit is 10)
 * const result = await sdk.magento.productReview({});
 * ```
 * @example
 * Fetching reviews for a specific product:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const result = await sdk.magento.productReview({ filter: { sku: { eq: '24-MB01' } );
 * ```
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'product-review-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query productReview($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
 *                products(search: $search, filter: $filter, sort: $sort) {
 *                  items {
 *                    review_count
 *                    reviews(pageSize: $pageSize, currentPage: $currentPage) {
 *                      items {
 *                        ${metadata?.fields}
 *                      }
 *                    }
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
 * Using a custom GraphQL query to change the amount of fields returned by the query:
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   productReview: 'product-review-custom-query',
 *   metadata: {
 *     fields: 'average_rating'
 *   }
 * };
 *
 * const result = await sdk.magento.productReview({}, customQuery);
 *
 * // result.data.products.items[0].reviews.items[0] will only contain the average_rating field
 * ```
 */
export async function productReview(
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery: CustomQuery = { productReview: "productReview" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<ProductReviewQuery>> {
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

  const { productReview: productReviewGQL } = context.extendQuery(customQuery, {
    productReview: {
      query: productReviewQuery,
      variables,
    },
  });

  try {
    return await context.client.query<ProductReviewQuery, ProductReviewQueryVariables>({
      query: gql`
        ${productReviewGQL.query}
      `,
      variables: productReviewGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
