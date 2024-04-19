import { ApolloQueryResult, gql } from "@apollo/client/core";
import { CustomQuery, ProductReviewRatingsMetadataQuery } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import productReviewRatingsMetadataQuery from "./productReviewRatingsMetadata";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Get the active ratings attributes and the values each rating can have.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch the active ratings attributes and the values each rating can have
 * const { data } = await sdk.magento.productReviewRatingsMetadata();
 *
 * data.productReviewRatingsMetadata.items; // array of review's attributes
 * data.productReviewRatingsMetadata.items[0].values; // array of possible values of the review's attributes
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
 *         'product-review-ratings-metadata-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query productReviewRatingsMetadata {
 *                productReviewRatingsMetadata {
 *                  items {
 *                    ${metadata.fields}
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
 * Using a custom GraphQL query to reduce the amount of data returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   productReviewRatingsMetadata: 'product-review-ratings-metadata-custom-query',
 *   metadata: {
 *     fields: `
 *      name
 *      values {
 *        value
 *      }
 *     `
 *   }
 * };
 *
 * const { data } = await sdk.magento.productReviewRatingsMetadata(customQuery);
 *
 * // data.productReviewRatingsMetadata.items[0] will contain only the fields specified in the custom query.
 * ```
 */
export async function productReviewRatingsMetadata(
  context: Context,
  customQuery: CustomQuery = { productReviewRatingsMetadata: "productReviewRatingsMetadata" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQuery>> {
  const { productReviewRatingsMetadata: productReviewRatingsMetadataGQL } = context.extendQuery(customQuery, {
    productReviewRatingsMetadata: {
      query: productReviewRatingsMetadataQuery,
    },
  });

  return context.client.query<ProductReviewRatingsMetadataQuery>({
    query: gql`
      ${productReviewRatingsMetadataGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
