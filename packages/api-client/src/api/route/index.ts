import type { ApolloQueryResult } from '@apollo/client/core';
import type {
  CustomHeaders, CustomQuery, QueryRouteArgs, RoutableInterface, RouteQuery,
} from '@vsf-enterprise/magento-api-types';
import routeQuery from './route';
import type { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Returns the canonical URL for a specified product, category, or CMS page
 *
 * @param context VSF Context
 * @param url the URL to be resolved
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function route(
  context: Context,
  url: string,
  customQuery: CustomQuery = { route: 'route' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<RouteQuery<RoutableInterface>>> {
  const { route: routeGQL } = context.extendQuery(customQuery, {
    route: {
      query: routeQuery,
      variables: { url },
    },
  });

  return context.client.query<RouteQuery<RoutableInterface>, QueryRouteArgs>({
    query: routeGQL.query,
    variables: routeGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
