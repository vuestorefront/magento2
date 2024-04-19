import { ApolloQueryResult } from "@apollo/client/core";
import {
  CustomerProductReviewParams,
  CustomerProductReviewQuery,
  CustomerProductReviewQueryVariables,
  CustomHeaders,
  CustomQuery,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import customerProductReview from "./reviews";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetch customer reviews
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch reviews, customer must be logged in
 * const result = await sdk.magento.reviews();
 *
 * // log all reviews
 * result?.data?.customer?.reviews?.items.forEach(review => console.log(review));
 * ```
 *
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'customer-product-review-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query reviews($pageSize: Int = 10, $currentPage: Int = 1) {
 *                customer {
 *                  reviews(pageSize: $pageSize, currentPage: $currentPage) {
 *                    ${metadata?.fields}
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
 * Using a custom GraphQL query to reduce the amount of fields returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * // fetch only text
 *
 * const customQuery = {
 *   reviews: 'customer-product-review-custom-query',
 *   metadata: {
 *     fields: 'items { text }'
 *   }
 * };
 *
 * const result = await sdk.magento.reviews({}, customQuery);
 *
 * // result will only contain the text of the reviews
 * result?.data?.customer?.reviews?.items.forEach(review => console.log(review.text));
 * ```
 */
export async function reviews(
  context: Context,
  searchParams?: CustomerProductReviewParams,
  customQuery: CustomQuery = { reviews: "reviews" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CustomerProductReviewQuery>> {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
  };

  const variables: CustomerProductReviewParams = {
    pageSize: searchParams?.pageSize ?? defaultParams.pageSize,
    currentPage: searchParams?.currentPage ?? defaultParams.currentPage,
  };

  const { reviews } = context.extendQuery(customQuery, {
    reviews: {
      query: customerProductReview,
      variables,
    },
  });

  try {
    return await context.client.query<CustomerProductReviewQuery, CustomerProductReviewQueryVariables>({
      query: gql`
        ${reviews.query}
      `,
      variables: reviews.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
