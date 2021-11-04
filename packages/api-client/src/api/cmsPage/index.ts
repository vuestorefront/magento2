import { ApolloQueryResult } from 'apollo-client';
import { Logger } from '@vue-storefront/core';
import { CmsPageQueryVariables, CmsPageQuery } from '../../types/GraphQL';
import cmsPage from './cmsPage';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  identifier: string,
): Promise<ApolloQueryResult<CmsPageQuery>> => {
  try {
    return await client
      .query<CmsPageQuery, CmsPageQueryVariables>({
      query: cmsPage,
      variables: { identifier },
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
};
