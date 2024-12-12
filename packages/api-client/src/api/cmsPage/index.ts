import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CmsPageQuery, CmsPageQueryVariables, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import { getLogger } from "@vue-storefront/middleware";
import cmsPageQuery from "./cmsPage";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetch CMS page
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch home page by the page identifier
 * const result = await sdk.magento.cmsPage({
 *   identifier: 'home'
 * });
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
 *         'cms-page-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query cmsPage($identifier: String) {
 *                cmsPage(identifier:$identifier) {
 *                  ${metadata?.fields}
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
 * // reduce the amount of fields to only the content and title
 * const customQuery = {
 *   cmsPage: 'cms-page-custom-query',
 *   metadata: {
 *     fields: 'title content'
 *   }
 * };
 *
 * const result = await sdk.magento.cmsPage({
 *   identifier: 'home'
 * }, customQuery);
 *
 * // result will only contain the title and content fields
 * ```
 */
export async function cmsPage(
  context: Context,
  identifier: string,
  customQuery: CustomQuery = { cmsPage: "cmsPage" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CmsPageQuery>> {
  const logger = getLogger(context);

  try {
    const { cmsPage: cmsPageGQL } = context.extendQuery(customQuery, {
      cmsPage: {
        query: cmsPageQuery,
        variables: { identifier },
      },
    });

    return await context.client.query<CmsPageQuery, CmsPageQueryVariables>({
      query: gql`
        ${cmsPageGQL.query}
      `,
      variables: cmsPageGQL.variables,
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
