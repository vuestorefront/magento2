import { ApolloQueryResult } from "@apollo/client/core";
import { CustomQuery, CountryInformationQuery, CountryInformationQueryVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import countryInformation from "./countryInformation";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetches the information about a country given its ID
 */
export async function country(
  context: Context,
  id: string,
  customQuery: CustomQuery = { country: "country" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<CountryInformationQuery>> {
  const { country: countryGQL } = context.extendQuery(customQuery, {
    country: {
      query: countryInformation,
      variables: { id },
    },
  });
  return context.client.query<CountryInformationQuery, CountryInformationQueryVariables>({
    query: countryGQL.query,
    variables: countryGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
