import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery, Logger } from '@vue-storefront/core';
import { CmsPageQueryVariables, CmsPageQuery } from '../../types/GraphQL';
import cmsPage from './cmsPage';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Fetch CMS Page from Magento
 * @param context - VSF Context
 * @param identifier - identifier of CMS page
 * @param customQuery - (optional) - custom query that extends default cmsPage GraphQL query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function getCmsPage(
  context: Context,
  identifier: string,
  customQuery: CustomQuery = { cmsPage: 'cmsPage' },
  customHeaders: Record<string, string> = {},
): Promise<ApolloQueryResult<CmsPageQuery>> {
  try {
    const { cmsPage: cmsPageGQL } = context.extendQuery(
      customQuery,
      {
        cmsPage: {
          query: cmsPage,
          variables: { identifier },
        },
      },
    );

    return await context.client
      .query<CmsPageQuery, CmsPageQueryVariables>({
      query: cmsPageGQL.query,
      variables: cmsPageGQL.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      Logger.debug(error);

      return {
        ...error,
        errors: error.graphQLErrors,
        data: null,
      };
    }
    Logger.error(error);
    throw error.networkError?.result || error;
  }
}
