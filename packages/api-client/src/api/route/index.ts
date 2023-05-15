import type { ApolloQueryResult } from '@apollo/client/core';
import type {
  CustomHeaders, QueryRouteArgs, RoutableInterface, RouteQuery,
} from '@vsf-enterprise/magento-api-types';
import gql from 'graphql-tag';
import routeQuery from './route';
import type { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Returns the canonical URL for a specified product, category, or CMS page
 *
 * @param context VSF Context
 * @param url the URL to be resolved
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function route(
  context: Context,
  url: string,
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<RouteQuery<RoutableInterface>>> {
  return context.client.query<RouteQuery<RoutableInterface>, QueryRouteArgs>({
    query: gql`${routeQuery}`,
    variables: { url },
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
