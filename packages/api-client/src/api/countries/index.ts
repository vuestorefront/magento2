import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CountriesListQuery, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import countriesListQuery from "./countriesList";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetch list of countries
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch list of countries
 * const result = await sdk.magento.countries();
 *
 * // result.data.countries is an array of countries
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
 *         'countries-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query countriesList {
 *                countries {
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
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   countries: 'countries-custom-query',
 *   metadata: {
 *     fields: 'full_name_english'
 *   }
 * };
 *
 * const result = await sdk.magento.countries(customQuery);
 *
 * // result.data.countries will only contain the full_name_english field
 * ```
 */
export async function countries(
  context: Context,
  customQuery: CustomQuery = { countries: "countries" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CountriesListQuery>> {
  const { countries: countriesGQL } = context.extendQuery(customQuery, {
    countries: {
      query: countriesListQuery,
    },
  });
  return context.client.query<CountriesListQuery>({
    query: gql`
      ${countriesGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
